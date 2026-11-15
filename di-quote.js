const quoteForm = document.querySelector("#quote-form");
const product = document.querySelector("#quote-product");
const result = document.querySelector("#quote-result");
const message = document.querySelector("#quote-message");
const status = document.querySelector("#quote-status");

quoteForm.hidden = false;

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    product.value = link.dataset.product;
    result.hidden = true;
    product.focus({ preventScroll: true });
  });
});

quoteForm.addEventListener("input", () => {
  result.hidden = true;
  status.textContent = "";
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = new FormData(quoteForm);
  const quantity = inputs.get("quantity").trim();
  const details = inputs.get("details").trim();
  const lines = [
    "Hello Dimple Industries, I’d like a quote.",
    `Product: ${product.value}`,
  ];

  if (quantity) lines.push(`Quantity: ${quantity}`);
  if (details) lines.push(`Specifications: ${details}`);

  message.value = lines.join("\n");
  status.textContent = "";
  result.hidden = false;
  message.focus();
});

document.querySelector("#quote-copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(message.value);
    status.textContent = "Request copied.";
  } catch {
    message.focus();
    message.select();
    status.textContent = "Request selected. Use your device’s Copy command.";
  }
});
