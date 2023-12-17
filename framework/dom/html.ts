import { html as uhtmlHtml, Value, Hole } from 'uhtml';

type RenderValue = Value | Function;

/**
 * A tag to render HTML content
 * @returns renderable and sanitised HTML
 */
export function html(template: TemplateStringsArray, ...values: RenderValue[]): Hole {
  return uhtmlHtml(template, ...values as any) as Hole;
}
