import { Router } from "express";
import yaml from "js-yaml";
const router = Router();

// Route to convert YAML to JSON
router.post("/yaml-to-json", (req, res) => {
  try {
    const yamlInput = req.body.yaml;
    const jsonOutput = yaml.load(yamlInput);
    res.json({ json: jsonOutput });
  } catch (error) {
    res.status(400).json({ error: "Invalid YAML input" });
  }
});

// Route to convert JSON to YAML
router.post("/json-to-yaml", (req, res) => {
  try {
    const jsonInput = req.body.json;
    const yamlOutput = yaml.dump(jsonInput);
    res.json({ yaml: yamlOutput });
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON input" });
  }
});

// Export the router
export const utilRouter = router;
