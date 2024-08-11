window.addEventListener("DOMContentLoaded", () => {
  const blockContainer = document.querySelector("#blocks");
  const blockSize = 50;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const numCols = Math.floor(screenWidth / blockSize);
  const numRows = Math.floor(screenHeight / blockSize);
  const numBlocks = numCols * numRows;

  function createBlocks() {
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.dataset.index = i;
      block.addEventListener("mousemove", highlightRandomNeighbors);
      blockContainer.appendChild(block);
    }
  }

  function highlightRandomNeighbors() {
    const index = parseInt(this.dataset.index);
    const neighbors = [
      index - 1,
      index + 1,
      index - numCols,
      index + numCols,
      index - numCols - 1,
      index - numCols + 1,
      index + numCols - 1,
      index + numCols + 1,
    ].filter(
      (i) =>
        i >= 0 &&
        i < numBlocks &&
        Math.abs((i % numCols) - (index % numCols)) <= 1
    );

    shuffleArray(neighbors)
      .slice(0, 1)
      .forEach((nindex) => {
        const neighbor = blockContainer.children[nindex];
        if (neighbor) {
          neighbor.classList.add("highlight");
          setTimeout(() => {
            neighbor.classList.remove("highlight");
          }, 500);
        }
      });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createBlocks();
});
