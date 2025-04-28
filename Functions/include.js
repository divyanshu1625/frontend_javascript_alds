async function loadHTML(id, file, scriptFile = null, loadedScripts = new Set()) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error("Could not load " + file);
      }
  
      const data = await response.text();
      document.getElementById(id).innerHTML = data;
  
      // Only load script if it has not already been loaded
      if (scriptFile && !loadedScripts.has(scriptFile)) {
        await loadScript(scriptFile); 
        loadedScripts.add(scriptFile);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Helper function to dynamically load scripts
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = resolve;  
      script.onerror = reject;    
      document.body.appendChild(script);
    });
  }
  
  // Set to keep track of loaded scripts
  const loadedScripts = new Set();
  
  // Map of placeholders to their HTML and JS files
  const sections = {
    header: {
      html: "Components/header.html",
      js: "index.js",
    },
    footer: {
      html: "Components/footer.html",
      js: "index.js",
    },
  };
  
  // Load all sections in order (await each one)
  (async () => {
    for (const id in sections) {
      await loadHTML(id, sections[id].html, sections[id].js, loadedScripts);
    }
  })();
  