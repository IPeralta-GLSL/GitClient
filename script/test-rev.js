const { execSync } = require('child_process');

try {
  const result = execSync('git rev-list --count HEAD --not --remotes', { encoding: 'utf8' });
  console.log('Unpushed commits:', result.trim());
} catch (err) {
  console.error('Error:', err.message);
}
