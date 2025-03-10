/*const matchesFilter = (filters = [], values = []) =>
  filters.length === 0 ||
  filters.some((filter) =>
    values.map((v) => v.toString().toLowerCase()).includes(filter.toLowerCase())
  );

const init = async () => {
  console.log("Hello World");

  // Inject a single <style> tag into <head>
  const style = document.createElement("style");
  document.head.appendChild(style);

  // Get URL parameters
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  // Convert search parameters into arrays
  const categories = searchParams.get("categories")?.split(",") || [];
  const years = searchParams.get("years")?.split(",") || [];
  const topics = searchParams.get("topics")?.split(",") || [];
  const techs = searchParams.get("techs")?.split(",") || [];
  //const favorite = searchParams.get("favorite")?.split(",") || [];

  try {
    const response = await fetch("/organizations.json");
    const allOrgs = await response.json();

    let cssRules = "";

    await allOrgs.forEach((org) => {
      const isMatch =
        matchesFilter(categories, org.categories) &&
        matchesFilter(years, org.years_appeared) &&
        matchesFilter(topics, org.topic_tags) &&
        matchesFilter(techs, org.tech_tags);

      if (isMatch) {
        //console.log("Match Found:", org.nav_url);
      } else {
        cssRules += `._${org.nav_url} { display: none; }\n`;
      }
    });

    // Apply all CSS rules at once
    style.textContent = cssRules;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
};

init();*/
