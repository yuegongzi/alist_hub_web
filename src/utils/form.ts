export function rule(label: string, required = true) {
  return {
    rules: [
      {
        required,
        message: `请输入${label}`,
      },
    ],
    label,
    placeholder: `请输入${label}`,
  };
}
