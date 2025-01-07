<script>
	export let progress = 0;
  let angle, background, cssVarStyles;

	$: angle = Math.min(360 * (progress / 100), 360);
	$: background = `radial-gradient(white 55%, transparent 56%),
    conic-gradient(transparent 0deg ${angle}deg, #f5f5f5 ${angle}deg 360deg),
    conic-gradient(rgba(67, 0, 176, 0.25) 0deg, rgba(67, 0, 176, 0.5) 90deg, rgba(67, 0, 176, 0.75) 180deg, rgba(67, 0, 176, 1));`;

  $: cssVarStyles = `--background:${background}`;
</script>

<div class="progress-circle" style="{cssVarStyles}">
  <span class="progress-value">{progress}%</span>
</div>

<style>
  .progress-circle {
    position: relative;
    background: var(--background);
    border-radius: 50%;
    width: 50vw;
    max-width: 300px;
    min-width: 200px;
    aspect-ratio: 1 / 1;
    transition: background-color 500ms ease-in;
    will-change: transform;
    margin: 0 auto;
    container: progress-circle / inline-size;
  }

  .progress-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10vw;
    font-weight: 700;
    color: #4300b0;
  }

  @container progress-circle (min-width: 300px) {
    .progress-value {
      font-size: 60px;
    }
  }

  @container progress-circle (max-width: 200px) {
    .progress-value {
      font-size: 40px;
    }
  }
</style>