export function step(message: string): void {
  console.log(`    -> ${message}`);
}

export function info(message: string): void {
  console.log(`    [info] ${message}`);
}

export function workflow(title: string, steps: string[]): void {
  const line = '='.repeat(72);
  console.log(`\n${line}`);
  console.log(`WORKFLOW VERIFIED: ${title}`);
  console.log(line);
  steps.forEach((entry, index) => {
    console.log(`  ${index + 1}. ${entry}`);
  });
  console.log(`${line}\n`);
}
