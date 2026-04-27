"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/code.ts
  var require_code = __commonJS({
    "src/code.ts"(exports) {
      figma.showUI(__html__, { width: 380, height: 520, title: "Word Counter" });
      function collectTextNodes(node) {
        if (node.type === "TEXT")
          return [node];
        if ("children" in node) {
          return [...node.children].flatMap((c) => collectTextNodes(c));
        }
        return [];
      }
      function readingTime(words) {
        if (words === 0)
          return "\u2014";
        const totalSec = Math.round(words / 200 * 60);
        const mm = Math.floor(totalSec / 60);
        const ss = totalSec % 60;
        return `${mm}:${String(ss).padStart(2, "0")}`;
      }
      function computeStats(text) {
        const trimmed = text.trim();
        if (!trimmed) {
          return { words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, readingTime: "\u2014" };
        }
        const words = trimmed.split(/\s+/).length;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, "").length;
        const paragraphs = trimmed.split(/\n{2,}/).filter((p) => p.trim().length > 0).length || 1;
        return { words, chars, charsNoSpaces, paragraphs, readingTime: readingTime(words) };
      }
      function doScan(scope) {
        const textNodes = scope === "selection" ? figma.currentPage.selection.flatMap((n) => collectTextNodes(n)) : figma.currentPage.findAll((n) => n.type === "TEXT");
        if (textNodes.length === 0) {
          return {
            stats: { words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, readingTime: "\u2014" },
            layers: [],
            layerCount: 0,
            isEmpty: true
          };
        }
        const layers = textNodes.map((n) => {
          const text = n.characters;
          const words = text.trim() ? text.trim().split(/\s+/).length : 0;
          const raw = text.replace(/\n/g, " ").trim();
          return {
            id: n.id,
            name: n.name || "Text",
            preview: raw.length > 44 ? raw.slice(0, 44) + "\u2026" : raw,
            words,
            chars: text.length
          };
        });
        const combined = textNodes.map((n) => n.characters).join("\n\n");
        const stats = computeStats(combined);
        return { stats, layers, layerCount: textNodes.length, isEmpty: false };
      }
      var currentScope = "selection";
      function push(scope) {
        figma.ui.postMessage({ type: "stats", result: doScan(scope), scope });
      }
      figma.ui.onmessage = (msg) => __async(exports, null, function* () {
        if (msg.type === "init")
          push(currentScope);
        if (msg.type === "setScope") {
          currentScope = msg.scope;
          push(currentScope);
        }
        if (msg.type === "close")
          figma.closePlugin();
        if (msg.type === "selectLayer" && msg.nodeId) {
          const node = yield figma.getNodeByIdAsync(msg.nodeId);
          if (node && node.type !== "DOCUMENT" && node.type !== "PAGE") {
            figma.currentPage.selection = [node];
            figma.viewport.scrollAndZoomIntoView([node]);
          }
        }
      });
      figma.on("selectionchange", () => push(currentScope));
    }
  });
  require_code();
})();
