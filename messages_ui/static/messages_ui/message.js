(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['message.html'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program3(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}

  buffer += "<li class=\"message ";
  foundHelper = helpers.tags;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.tags; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n  <p class=\"body\">";
  foundHelper = helpers.escapeHTML;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  else { stack1 = depth0.escapeHTML; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.escapeHTML) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.escapeHTML;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.program(3, program3, data),fn:self.noop}); }
  else { stack1 = depth0.escapeHTML; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if (!helpers.escapeHTML) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.noop}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n  <a href=\"#\" class=\"close\">dismiss this message</a>\n</li>\n";
  return buffer;});
})();