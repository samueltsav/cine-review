async function partials(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error("Failed to load " + file);
        document.getElementById(id).innerHTML = await response.text();
    } catch (err) {
        console.error(err);
    }
}

partials("navbar", "/navbar.html");
partials("footer", "/footer.html");