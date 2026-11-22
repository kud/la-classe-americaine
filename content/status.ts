/**
 * The spec's two marks, carried into the data.
 *
 * - "attested" (✓): attested by V1 (2011) or a source reached during research.
 * - "uncertain" (◌): uncertain or conflicting; never published.
 *
 * Neither means "checked against the film". That is `filmChecked`, which stays
 * false until someone verifies the line or credit against the film or its end
 * credits. `QUOTE_GATE=film npm test` turns the build gate strict on it.
 */
export type Status = "attested" | "uncertain";
