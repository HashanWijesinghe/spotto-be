export function filterEmptyFields(
  obj: Record<string, any>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null,
    ),
  );
}
