import {ImageExporterOptions} from '../exporter';
import type {Plugin} from '../plugin';
import {FullSceneDescription, SceneDescription} from '../scenes';
import {CanvasColorSpace, Color, Vector2} from '../types';
import {Logger} from './Logger';

export interface ProjectSettings {
  /**
   * The name of the project.
   */
  name?: string;

  /**
   * A list of scene descriptions that make up the project.
   *
   * @remarks
   * A full scene description can be obtained by loading a scene module with a
   * `?scene` query parameter.
   *
   * @example
   * ```ts
   * import exampleScene from './example?scene';
   *
   * export default makeProject({
   *   scenes: [exampleScene],
   * });
   * ```
   */
  scenes: SceneDescription[];

  /**
   * A list of plugins to include in the project.
   *
   * @remarks
   * When a string is provided, the plugin will be imported dynamically using
   * the string as the module specifier. This is the preferred way to include
   * editor plugins because it makes sure that the plugin's source code gets
   * excluded from the production build.
   */
  plugins?: (Plugin | string)[];

  /**
   * A custom logger instance to use.
   */
  logger?: Logger;

  /**
   * An url for the audio track to play alongside the animation.
   *
   * @see https://motioncanvas.io/docs/media#audio
   */
  audio?: string;

  /**
   * @deprecated Configure the offset in the Video Settings tab of th editor.
   */
  audioOffset?: number;

  /**
   * Default values for project variables.
   *
   * @see https://motioncanvas.io/docs/project-variables
   */
  variables?: Record<string, unknown>;

  /**
   * Enable experimental features.
   *
   * @see https://motioncanvas.io/docs/experimental
   *
   * @experimental
   */
  experimentalFeatures?: boolean;
}

export interface Versions {
  core: string;
  two: string | null;
  ui: string | null;
  vitePlugin: string | null;
}

// TODO(refactor): figure out naming
export interface ProjectSettings2 {
  shared: {
    background: Color | null;
    range: [number, number];
    size: Vector2;
    audioOffset: number; // TODO: check what this does
  };
  rendering: {
    // TODO: check if we can get rid of options
    exporter:
      | {
          name: '@revideo/core/image-sequence';
          options: ImageExporterOptions;
        }
      | {
          name: '@revideo/core/ffmpeg';
          options: undefined;
        }
      | {
          name: '@revideo/core/wasm';
          options: undefined;
        };
    fps: number;
    resolutionScale: number; // TODO: check what this does
    colorSpace: CanvasColorSpace; // TODO: check what this does
  };
  preview: {
    fps: number;
    resolutionScale: number;
  };
}

export interface Project {
  name: string;
  scenes: FullSceneDescription[];
  plugins: Plugin[];
  logger: Logger;
  // meta: ProjectMetadata;
  // settings: SettingsMetadata;
  // TODO(refactor): rename to just "settings"
  settingsNew: ProjectSettings2;
  audio?: string;
  variables?: Record<string, unknown>;
  versions: Versions;
  experimentalFeatures: boolean;

  /**
   * TODO(konsti): When moving away from `.meta` files,
   * all settings will be passed to the project through
   * an object instead of the file.
   *
   * When we do that, we can remove this method and
   * provide this as a property on the settings object.
   */
  setAssetBase: (base: `${string}/`) => void;
}

export function makeProject(settings: ProjectSettings) {
  return settings;
}
