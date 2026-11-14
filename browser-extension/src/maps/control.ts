import { worlds } from "zwift-data";
import { contains } from "./geometry";
import { restoreCamera } from "./engine";
import { applyStyle, loadZwiftStyle } from "./style";
import { registerTileProvider } from "./tile-requests";
import { createTileRenderer } from "./tiles";
import { NativeMap } from "./types";

export function addMapControl({
  canvas,
  engine,
  select: original,
  version,
}: NativeMap) {
  const select = original.cloneNode(true) as HTMLSelectElement;
  select.dataset.testid = "zwiftmap-map-style-select";
  select.append(new Option("Zwift", "zwift"));
  const previousDisplay = original.style.display;
  original.style.display = "none";
  original.after(select);
  const provider = registerTileProvider(createTileRenderer());
  let builtin = original.value;
  let template: string | undefined;
  let active = false;
  let disposed = false;
  let restoreOnDispose = true;
  let revision = 0;

  function restore() {
    const target = active ? engine.getCamera().getTarget() : undefined;
    if (active && template)
      engine
        .getTileSources()
        .setTileSourceTemplateUrl("summer-imagery", template);
    active = false;
    original.value = builtin;
    original.dispatchEvent(new Event("change", { bubbles: true }));
    // MRE caches textures by source name, even after its URL template changes.
    if (target) {
      engine.getDebugApi().clearCache();
      restoreCamera(engine, target);
    }
  }

  async function change() {
    const current = ++revision;
    if (select.value !== "zwift") {
      builtin = select.value;
      restore();
      return;
    }
    select.disabled = true;
    try {
      const style = await loadZwiftStyle(Number(builtin), version);
      if (disposed || current !== revision) return;
      const target = engine.getCamera().getTarget();
      active = true;
      await applyStyle(engine, style);
      if (disposed) {
        if (restoreOnDispose && canvas.isConnected) restore();
        return;
      }
      if (current !== revision) {
        restore();
        return;
      }
      template ??= engine
        .getTileSources()
        .getTileSources()
        .find((source) => source.name === "summer-imagery")?.templateUrl;
      engine
        .getTileSources()
        .setTileSourceTemplateUrl("summer-imagery", provider.template);
      engine.getDebugApi().clearCache();
      restoreCamera(engine, target);
    } catch (error) {
      if (!disposed) {
        select.value = builtin;
        restore();
        console.warn("ZwiftMap: could not enable Zwift maps.", error);
      }
    } finally {
      if (!disposed) select.disabled = false;
    }
  }
  select.addEventListener("change", change);

  const type = globalThis.pageView?._activity?.attributes?.detailedType;
  const { latitude, longitude } = engine.getCamera().getTarget().lookAtPoint;
  if (
    type
      ? type.toLowerCase().includes("virtual")
      : worlds.some((world) => contains(world.bounds, latitude, longitude))
  ) {
    select.value = "zwift";
    void change();
  }

  return (restoreMap = true) => {
    disposed = true;
    restoreOnDispose = restoreMap;
    revision++;
    select.removeEventListener("change", change);
    select.remove();
    original.style.display = previousDisplay;
    if (active && restoreMap && canvas.isConnected) restore();
    provider.dispose();
  };
}
