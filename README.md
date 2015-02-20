# Mozaïk AWS widgets

## AWS Stacks

> Display a list of your existing AWS stacks.

### parameters

*This widget has no parameter*

### usage

```javascript
{
  type: 'aws.stacks',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## AWS Instances

> Display a list of your existing AWS EC2 instances.

### parameters

key          | required | description
-------------|----------|------------------------------------------------------------------------
`nameFilter` | no       | *If set, will display only instances with name matching the given value.*

### usage

```javascript
{
  type: 'aws.instances', [nameFilter: /FRONT/,]
  columns: 1, rows: 1, x: 0, y: 0
}
```