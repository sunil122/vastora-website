export default async function handler(req, res) {
  const id = req.query.id;
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return res.status(400).json({ error: "Invalid Poly Haven asset id" });
  }
  try {
    const upstream = await fetch("https://api.polyhaven.com/files/" + encodeURIComponent(id), {
      headers: { "User-Agent": "VASTORA-3D-Showroom/1.0 (CC0 asset browser)" }
    });
    const body = await upstream.text();
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(upstream.status).send(body);
  } catch (error) {
    return res.status(502).json({ error: "Poly Haven asset service unavailable" });
  }
}