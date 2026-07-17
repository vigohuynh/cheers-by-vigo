const VALID_TYPES = new Set(["truth", "dare", "random"]);

export interface CsvCardRow {
  id?: unknown;
  type?: unknown;
  content?: unknown;
}

export interface ValidationError {
  row: number;
  field: "id" | "type" | "content";
  message: string;
}

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isInteger(value: string): boolean {
  return /^-?\d+$/.test(value);
}

function setFailureExitCode(): void {
  const runtime = globalThis as typeof globalThis & {
    process?: { exitCode?: number };
  };

  if (runtime.process) {
    runtime.process.exitCode = 1;
  }
}

export function validateCsvRows(
  rows: CsvCardRow[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set<string>();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const id = toTrimmedString(row.id);
    const type = toTrimmedString(row.type);
    const content = toTrimmedString(row.content);

    if (!id) {
      errors.push({
        row: rowNumber,
        field: "id",
        message: "id is required.",
      });
    } else if (!isInteger(id)) {
      errors.push({
        row: rowNumber,
        field: "id",
        message: "id must be an integer.",
      });
    } else if (ids.has(id)) {
      errors.push({
        row: rowNumber,
        field: "id",
        message: `id "${id}" must be unique.`,
      });
    } else {
      ids.add(id);
    }

    if (!type) {
      errors.push({
        row: rowNumber,
        field: "type",
        message: "type is required.",
      });
    } else if (!VALID_TYPES.has(type)) {
      errors.push({
        row: rowNumber,
        field: "type",
        message: "type must be truth, dare, or random.",
      });
    }

    if (!content) {
      errors.push({
        row: rowNumber,
        field: "content",
        message: "content is required and cannot be empty.",
      });
    }
  });

  return errors;
}

export function reportValidationErrors(
  errors: ValidationError[]
): boolean {
  if (errors.length === 0) {
    return true;
  }

  console.error("CSV validation failed:");

  errors.forEach(({ row, field, message }) => {
    console.error(`  Row ${row}, ${field}: ${message}`);
  });

  setFailureExitCode();
  return false;
}

export function validateAndReportCsvRows(
  rows: CsvCardRow[]
): boolean {
  return reportValidationErrors(validateCsvRows(rows));
}
