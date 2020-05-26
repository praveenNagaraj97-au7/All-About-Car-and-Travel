// Views

exports.view = (templateName, bodyObject) => {
  return (req, res) => {
    res.render(templateName, bodyObject);
  };
};
