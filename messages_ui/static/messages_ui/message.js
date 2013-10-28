(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['message'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {

  var stack1;
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program3(depth0,data) {

  var stack1;
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

  buffer += "<li class=\"message ";
  if (stack1 = helpers.tags) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tags; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  <p class=\"body\">";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.escapeHTML) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.escapeHTML; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.escapeHTML) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  options = {hash:{},inverse:self.program(3, program3, data),fn:self.noop,data:data};
  if (stack1 = helpers.escapeHTML) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.escapeHTML; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.escapeHTML) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n  <a href=\"#\" class=\"close\">dismiss this message</a>\n</li>\n";
  return buffer;
  });
})();
