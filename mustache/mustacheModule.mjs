//mus. (result, template) as input parameters, returning the html.
export function mustacheEmailRenderFunction(result, template) {
  //make into promise
  return new Promise((resolve) => {
    //mustache function if using external template
    fetch(template)
      .then((response) => response.text())
      .then((template) => {
        const rendered = Mustache.render(template, result);
        resolve(rendered);
      });
  });
}

//parameters: data array eg [{},{}], mustache template, id of tag where want to display UI.
export function mustacheRenderFunction(result, template, renderLocationID) {
  //mustache function if using external template
  fetch(template)
    .then((response) => response.text())
    .then((template) => {
      var rendered = Mustache.render(template, result);
      document.getElementById(renderLocationID).innerHTML = rendered;
    });
}

export function mustacheRenderFunction2(result, template, renderLocationID) {
  //mustache function if using external template
  return new Promise((resolve) => {
    fetch(template)
      .then((response) => response.text())
      .then((template) => {
        var rendered = Mustache.render(template, result);
        document.getElementById(renderLocationID).innerHTML = rendered;
      })
      .then(resolve)
  })
}