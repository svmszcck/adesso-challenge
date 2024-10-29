module.exports = {
  overrides: [
    {
      // Test files only
      files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
        "*.ts",
        "*.js",
      ],
      extends: ["expo", "plugin:testing-library/react"],
    },
  ],
};
