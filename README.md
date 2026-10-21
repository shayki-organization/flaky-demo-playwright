# flaky-demo-playwright

Demo repository for exercising a flaky-test detector against GitHub Actions logs
(Playwright Test, list reporter).

- `tests/pricing.spec.ts` uses plain API-level tests (no browser fixtures, no
  browser downloads) with stable tests plus two intentionally flaky tests
  (`flaky: ...`) failing ~40% of runs.
- `.github/workflows/tests.yml` (`Tests` → `unit-tests`) runs `playwright test`
  with `workers: 1`, `retries: 0` so the detector sees the standard
  `✘ N [chromium] › file.spec.ts:LINE:COL › title` failure lines.
