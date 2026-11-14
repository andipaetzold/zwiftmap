type RenderTile = (quadkey: string) => Promise<string>;

// One shared bridge: unrelated requests never change, including with multiple maps mounted.
const providers = new Map<string, RenderTile>();
const pending = new WeakMap<
  XMLHttpRequest,
  { render: RenderTile; quadkey: string }
>();
let uninstall: (() => void) | undefined;

function install() {
  const prototype = XMLHttpRequest.prototype;
  const { open, send, abort } = prototype;

  prototype.open = function (
    method: string,
    url: string | URL,
    ...args: unknown[]
  ) {
    pending.delete(this);
    for (const [prefix, render] of providers) {
      const path = String(url);
      if (!path.startsWith(prefix)) continue;
      const quadkey = path
        .slice(prefix.length)
        .match(/^([0-3]{0,22})\.png$/)?.[1];
      if (quadkey !== undefined) pending.set(this, { render, quadkey });
    }
    return Reflect.apply(open, this, [method, url, ...args]);
  };

  prototype.send = function (body) {
    const request = pending.get(this);
    if (!request) return send.call(this, body);
    // Image decoding is asynchronous. Preserve settings when opening the generated data URL.
    void request
      .render(request.quadkey)
      .then((url) => {
        if (pending.get(this) !== request) return;
        const { responseType, timeout, withCredentials } = this;
        open.call(this, "GET", url, true);
        this.responseType = responseType;
        this.timeout = timeout;
        this.withCredentials = withCredentials;
        pending.delete(this);
        send.call(this);
      })
      .catch(() => {
        if (pending.get(this) !== request) return;
        pending.delete(this);
        abort.call(this);
        this.dispatchEvent(new ProgressEvent("error"));
      });
  };

  prototype.abort = function () {
    pending.delete(this);
    return abort.call(this);
  };

  const installed = {
    open: prototype.open,
    send: prototype.send,
    abort: prototype.abort,
  };
  return () => {
    // Do not overwrite wrappers installed by Strava or another extension afterwards.
    if (prototype.open === installed.open) prototype.open = open;
    if (prototype.send === installed.send) prototype.send = send;
    if (prototype.abort === installed.abort) prototype.abort = abort;
  };
}

export function registerTileProvider(render: RenderTile) {
  const prefix = `${location.origin}/__zwiftmap_tiles__/${crypto.randomUUID()}/`;
  if (!providers.size) uninstall = install();
  providers.set(prefix, render);
  return {
    template: `${prefix}{quadkey}.png`,
    dispose() {
      providers.delete(prefix);
      if (!providers.size) {
        uninstall?.();
        uninstall = undefined;
      }
    },
  };
}
