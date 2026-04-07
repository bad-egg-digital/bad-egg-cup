export function fontAwesomeIconClassNames(icons = {})
{
  if(!icons) return [];

  let names = [];

  for (const [key, props] of Object.entries(icons)) {
    if(!(names.includes(props.iconName))) {
      names.push(props.iconName);
    }
  }

  return names;
}

export function fontAwesomeSelectOptions(icons = {}, set = 'solid')
{
  if(!icons) return [];

  let names = fontAwesomeIconClassNames(icons);
  let options = [
    {
      key: 0,
      name: '',
    }
  ];

  names.forEach( name => options.push({
    key: name,
    name: name.replace('-', ' '),
  }));

  return options;
};
