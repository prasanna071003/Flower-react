export function notFound(req, res) {
  res.status(404).json({
    success: false,
    data: null,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, _next) {
  let status = Number(err.status || err.statusCode) || (res.statusCode >= 400 ? res.statusCode : 500);
  let message = "Something went wrong on the server. Please try again.";

  if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Request body must be valid JSON.";
  } else if (err.type === "entity.too.large") {
    status = 413;
    message = "Request body is too large.";
  } else if (status < 500) {
    message = err.message || "Request could not be completed.";
  }

  console.error(`[error] ${status} — ${err.message}`);
  res.status(status).json({ success: false, data: null, message });
}
