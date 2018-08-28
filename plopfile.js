module.exports = function(plop) {
  const name = '{{ properCase name }}';
  plop.setGenerator('component', {
    description: 'generate vue component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name please'
    }],
    actions: [{
      type: 'add',
      path: `src/components/${name}/index.js`,
      templateFile: 'plop-templates/component/index.plopjs'
    }, {
      type: 'add',
      path: `src/components/${name}/${name}.vue`,
      templateFile: 'plop-templates/component/component.plopvue'
    }]
  });

  plop.setGenerator('none', {});
};