# 🔐 GitHub Branch Protection Setup Guide

Follow these steps in your browser to set up branch protection rules that require all changes (including owner) to go through PRs.

---

## 📍 Step 1: Navigate to Branch Protection Settings

1. Go to your GitHub repository
2. Click **Settings** (tab at the top)
3. In the left sidebar, click **Branches** (under "Code and automation")
4. Click **Add branch protection rule** (or edit existing rule)

---

## 📍 Step 2: Configure Branch Protection for `main`

### Basic Settings:
| Setting | Value |
|---------|-------|
| **Branch name pattern** | `main` |

### Protect matching branches - Enable these:

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1` (or more for teams)
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (optional, if you have CODEOWNERS file)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Add these required status checks:
    - `ESLint Check`
    - `TypeScript Check`
    - `Unit Tests`
    - `Build Check`

- [x] **Require conversation resolution before merging**

- [x] **Require signed commits** (optional but recommended)

- [x] **Require linear history** (optional - prevents merge commits)

- [x] **Do not allow bypassing the above settings**
  > ⚠️ **IMPORTANT**: This prevents even admins/owners from pushing directly!

- [x] **Restrict who can push to matching branches** (optional)

### Rules applied to everyone including administrators:
- [ ] Allow force pushes → **Keep UNCHECKED**
- [ ] Allow deletions → **Keep UNCHECKED**

Click **Create** or **Save changes**

---

## 📍 Step 3: Create Ruleset for Additional Protection (GitHub Enterprise/Pro)

If you have GitHub Pro or Enterprise, you can use Rulesets for more granular control:

1. Go to **Settings** → **Rules** → **Rulesets**
2. Click **New ruleset** → **New branch ruleset**

Configure:
```
Name: Main Branch Protection
Enforcement status: Active
Target branches: main

Rules:
✅ Restrict deletions
✅ Require linear history
✅ Require a pull request before merging
   - Required approvals: 1
   - Dismiss stale reviews: Yes
   - Require review from code owners: Yes
✅ Require status checks to pass
   - Required checks: ESLint Check, TypeScript Check, Unit Tests, Build Check
✅ Block force pushes

Bypass list: (leave empty to apply to everyone including admins)
```

---

## 📍 Step 4: Protect `develop` Branch (Optional)

Repeat Step 2 for the `develop` branch with slightly relaxed rules:

| Setting | Value |
|---------|-------|
| **Branch name pattern** | `develop` |
| Require approvals | `1` |
| Required status checks | Same as main |
| Do not allow bypassing | Optional (can allow for develop) |

---

## 📍 Step 5: Enable Required Workflows

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - Select **Read and write permissions**
   - [x] Allow GitHub Actions to create and approve pull requests

---

## 📍 Step 6: Configure Repository Settings

### General Settings:
1. Go to **Settings** → **General**
2. Under "Pull Requests":
   - [x] Allow squash merging (recommended)
   - [x] Allow merge commits
   - [ ] Allow rebase merging (optional)
   - [x] Always suggest updating pull request branches
   - [x] Automatically delete head branches

---

## 📍 Step 7: Add Labels for Version Bumping

Create these labels in your repository for automatic version detection:

1. Go to **Issues** → **Labels** → **New label**

| Label | Color | Description |
|-------|-------|-------------|
| `major` | `#B60205` (red) | Breaking changes - major version bump |
| `breaking` | `#B60205` (red) | Breaking changes - major version bump |
| `minor` | `#B60205` (green) | New features - minor version bump |
| `feature` | `#0E8A16` (green) | New features - minor version bump |
| `patch` | `#1D76DB` (blue) | Bug fixes - patch version bump |
| `fix` | `#1D76DB` (blue) | Bug fixes - patch version bump |
| `bugfix` | `#1D76DB` (blue) | Bug fixes - patch version bump |

---

## 📍 Step 8: Set Up CODEOWNERS (Optional)

Create a CODEOWNERS file to require specific reviewers:

```bash
# .github/CODEOWNERS

# Default owners for everything
* @your-username

# Specific paths
/app/ @frontend-team
/lib/ @core-team
/.github/ @devops-team
```

---

## 🔄 Workflow Summary

After setup, your workflow will be:

```
1. Create feature branch from main
   git checkout -b feature/my-feature

2. Make changes and commit
   git add .
   git commit -m "feat: add new feature"

3. Push branch
   git push origin feature/my-feature

4. Create Pull Request on GitHub
   - CI runs automatically (lint, type-check, tests, build)
   - Request review from team members
   - Add appropriate labels (feature, fix, etc.)

5. After approval + CI passes
   - Merge PR (squash recommended)
   - Version automatically bumps
   - Release created automatically
   - Branch deleted automatically
```

---

## ⚠️ Important Notes

1. **Owner Bypass**: With "Do not allow bypassing" enabled, even repository owners MUST use PRs
2. **Emergency Access**: Keep a PAT (Personal Access Token) with admin rights for true emergencies
3. **CI Must Pass**: PRs cannot be merged until all status checks pass
4. **Version Bump**: Happens automatically after PR merge based on labels/title

---

## 🆘 Troubleshooting

### "Admin can still push directly"
- Ensure "Do not allow bypassing the above settings" is checked
- If using Rulesets, ensure bypass list is empty

### "Status checks not appearing"
- Run the CI workflow at least once for checks to appear in dropdown
- Push a test branch to trigger CI

### "Version bump not working"
- Ensure the workflow has write permissions
- Check that `GITHUB_TOKEN` has correct permissions
- Verify PR was merged (not just closed)
