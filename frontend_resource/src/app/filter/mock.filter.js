(function() {
    'use strict';
    /**
     * @Author   广州银云信息科技有限公司 eolinker
     * @function [mock数据生成过滤器（依赖mockjs文件）] [mock data generation filter (dependent mockjs file)]
     * @version  3.1.5
     * @service  $filter [注入过滤器服务] [Inject filter service]
     */
    angular.module('eolinker.filter')

        .filter('mockFilter', ['$filter', function($filter) {
            var data = {
                fun: {
                    switchType: null,
                    value: null,
                }
            }
            /**
             * @function [根据类型赋予不同mock随机值功能函数] [Assigning different mock random value function types based on type]
             */
            data.fun.switchType = function(arg) {
                var template = {
                    callback: '', //返回对象 Return object
                    val: arg.val //当前输入值 Current input value
                }
                switch (arg.type) {
                    case '0':
                        {
                            template.callback = Mock.Random.string();
                            break;
                        }
                    case '1':
                        {
                            template.callback = Mock.Random.image();
                            break;
                        }
                    case '2':
                    case '13':
                        {
                            template.callback = {}; //{ 'key1': '测试json数据1', 'key2': '测试json数据2' };
                            break;
                        }
                    case '3':
                    case '10':
                    case '11':
                    case '14':
                        {
                            template.callback = Mock.Random.integer();
                            break;
                        }

                    case '4':
                    case '5':
                        {
                            template.callback = Mock.Random.float()
                            break;
                        }
                    case '6':
                        {
                            template.callback = Mock.Random.date();
                            break;
                        }
                    case '7':
                        {
                            template.callback = Mock.Random.datetime();
                            break;
                        }
                    case '8':
                        {
                            template.callback = Mock.Random.boolean();
                            break;
                        }
                    case '9':
                        {
                            template.callback = 96;
                            break;
                        }
                    case '12':
                        {
                            template.callback = []; //Mock.Random.range(10);
                            break;
                        }
                }
                return template.callback;
            }

            /**
             * @function [输出mock值] [Output mock value]
             */
            data.fun.value = function(arg) {
                if ((arg.value || '').trim().substr(0, 6) == '@mock=') {

                    try {
                        if (arg.value.trim().substr(6, 8) == 'function') {
                            return (new Function("return " + arg.value.trim().slice(6, arg.value.length)))();
                        } else if (arg.value.trim().substring(6, 7) == '@') {
                            return arg.value.trim().slice(6, arg.value.length);
                        } else {
                            if (/Mock/.test(arg.value.substring(6))) {
                                return arg.value.trim().slice(6, arg.value.length);
                            } else {
                                try {
                                    return eval('(' + arg.value.trim().slice(6, arg.value.length) + ')');
                                } catch (e) {
                                    return arg.value.trim().slice(6, arg.value.length);
                                }
                            }

                        }
                    } catch (e) {
                        return data.fun.switchType({
                            val: arg.value,
                            type: arg.type
                        });
                    }
                } else {
                    return data.fun.switchType({
                        val: arg.value,
                        type: arg.type
                    });
                }
            }

            data.fun.typeof = function(object) {
                var tf = typeof object,
                    ts = Object.prototype.toString.call(object);
                return null === object ? 'Null' :
                    'undefined' == tf ? 'Undefined' :
                    'boolean' == tf ? 'Boolean' :
                    'number' == tf ? 'Number' :
                    'string' == tf ? 'String' :
                    '[object Function]' == ts ? 'Function' :
                    '[object Array]' == ts ? 'Array' :
                    '[object Date]' == ts ? 'Date' : 'Object';
            }
            data.fun.loop = function(arg) {
                var template = {
                    length: 0,
                    $index: 0,
                    item: [],
                    loop: {
                        array: {
                            item: arg.array.item, //参数名切割>>/::数组
                        },
                        parent: {
                            level: arg.parent.level + 1,
                            name: arg.parent.name, //父级参数名
                            object: arg.parent.object, //父级存储变量
                            rule: arg.parent.rule, //规则性父参名
                            array: arg.parent.array //父级数组：default(无保护规则),rule(包含规则)
                        },
                        key: arg.key
                    }
                }
                if (arg.parent.level == 100) {
                    return
                }
                if (arg.array.item.length > 0) {
                    angular.copy(arg.array.item, template.item);
                    template.item.splice(0, arg.parent.level);
                    if (arg.array.item[arg.parent.level - 1] == arg.parent.name && template.item.indexOf(arg.parent.name) == -1) {
                        if (data.fun.typeof(template.loop.parent.object[template.loop.parent.rule]) == 'Array') {
                            template.length = template.loop.parent.object[template.loop.parent.rule].length >= 1 ? template.loop.parent.object[template.loop.parent.rule].length - 1 : 0;
                            if (data.fun.typeof(template.loop.parent.object[template.loop.parent.rule][template.length]) == 'Undefined') {
                                template.loop.parent.object[template.loop.parent.rule][template.length] = {};
                            } else if (data.fun.typeof(template.loop.parent.object[template.loop.parent.rule][template.length]) != 'Object') {
                                template.length++;
                                template.loop.parent.object[template.loop.parent.rule][template.length] = {};
                            }
                            template.loop.parent.object[template.loop.parent.rule][template.length][arg.key.name] = arg.key.value;
                        } else if (data.fun.typeof(template.loop.parent.object[template.loop.parent.rule]) == 'Object') {
                            template.loop.parent.object[template.loop.parent.rule][arg.key.name] = arg.key.value;
                        } else {
                            template.loop.parent.object[template.loop.parent.rule] = {};
                            template.loop.parent.object[template.loop.parent.rule][arg.key.name] = arg.key.value;
                        }
                    } else {
                        template.$index = template.loop.parent.array.default.indexOf(arg.array.item.slice(0, arg.parent.level, 1).join('>>'))
                        if (data.fun.typeof(template.loop.parent.object[template.loop.parent.array.rule[template.$index]]) == 'Array') {
                            template.loop.parent.object = template.loop.parent.object[template.loop.parent.array.rule[template.$index]][0];
                        } else {
                            if (data.fun.typeof(template.loop.parent.object[template.loop.parent.array.rule[template.$index]]) != 'Object') {
                                template.loop.parent.object[template.loop.parent.array.rule[template.$index]] = {};
                            }
                            template.loop.parent.object = template.loop.parent.object[template.loop.parent.array.rule[template.$index]];

                        }
                        data.fun.loop(template.loop);
                    }
                } else {
                    template.loop.parent.object = arg.key.value;
                }
            }
            data.fun.main = function(arg) {
                var template = {
                    loopObject: null,
                    array: {
                        parent: arg.parent || [], //父存储位置数组（字符串）
                        templateParent: arg.templateParent || [],
                        child: [], //子存储位置数组（json）
                        item: [], //临时切割变量存放数组
                    },
                    loopVar: {
                        $index: 0,
                        length: 0
                    },
                    icon: {
                        child: false,
                        parent: false
                    },
                    result: arg.result || {}
                }
                angular.forEach(arg.input, function(val, key) {
                    template.array.item = (val.paramKey + '').replace(/(\s)*([:]{2}|[>]{2})(\s)*/g, '>>').split(/[:]{2}|[>]{2}/);
                    template.loopVar.length = template.array.item.length;
                    if (val.paramKey) {
                        switch (template.loopVar.length) {
                            case 1:
                                {
                                    if (template.array.item[0]) {
                                        template.array.parent.push(template.array.item[0] + (val.rule ? ('|' + val.rule) : ''));
                                        template.array.templateParent.push(template.array.item[0]);
                                        template.result[template.array.item[0] + (val.rule ? ('|' + val.rule) : '')] = data.fun.value({
                                            value: val.value,
                                            type: val.paramType
                                        });
                                        template.icon.parent = true;
                                    }
                                    break;
                                }
                            default:
                                {
                                    template.loopVar.$index = template.array.templateParent.indexOf(template.array.item.slice(0, template.loopVar.length - 1, 1).join('>>'));
                                    if (template.loopVar.$index > -1) {
                                        template.array.templateParent.push(template.array.item.join('>>'));
                                        template.array.parent.push(template.array.item[template.loopVar.length - 1] + (val.rule ? ('|' + val.rule) : ''));
                                        template.loopObject = {
                                            array: {
                                                item: template.array.item,
                                            },
                                            parent: {
                                                level: 1,
                                                name: template.array.item[template.loopVar.length - 2],
                                                object: template.result,
                                                rule: template.array.parent[template.loopVar.$index],
                                                array: {
                                                    rule: template.array.parent,
                                                    default: template.array.templateParent
                                                }
                                            },
                                            key: {
                                                name: template.array.item[template.loopVar.length - 1] + (val.rule ? ('|' + val.rule) : ''),
                                                value: data.fun.value({
                                                    value: val.value,
                                                    type: val.paramType
                                                }),
                                                type: val.type,
                                                rule: val.rule
                                            }
                                        }
                                        data.fun.loop(template.loopObject);
                                        template.icon.parent = true;
                                    } else {
                                        template.array.child.push(val);
                                        template.icon.child = true;
                                    }
                                    break;
                                }
                        }
                    }
                })
                if (template.icon.parent && template.icon.child) {
                    template.result = data.fun.main({
                        input: template.array.child,
                        result: template.result,
                        parent: template.array.parent,
                        templateParent: template.array.templateParent
                    })
                } else if (template.icon.child) {
                    angular.forEach(template.array.child, function(val, key) {
                        template.result[val.paramKey + (val.rule ? ('|' + val.rule) : '')] = data.fun.value({
                            value: val.value,
                            type: val.paramType
                        });
                    })
                }
                return template.result;
            }
            return function(input, config) {
                try {
                    config = config || {};
                    var template = {
                        origin: data.fun.main({
                            input: input
                        }),
                        output: {}
                    }
                    switch (config.type) {
                        case 'array':
                            {
                                template.output['@type' + (config.rule ? ('|' + config.rule) : '')] = [function() {
                                    return Mock.mock(template.origin)
                                }];
                                break
                            }
                        default:
                            {
                                template.output['@type' + (config.rule ? ('|' + config.rule) : '')] = function() {
                                    return Mock.mock(template.origin)
                                };
                            }
                    }
                    return JSON.stringify(Mock.mock(template.output)['@type']);
                } catch (error) {
                    return JSON.stringify({
                        "tips": "mock生成数据出错"
                    })
                }
            }
        }])

})();