HTMLHint.addRule({
    id: 'bem-class',
    description: 'BEM class name is forced',
    init: function(parser, reporter) {
        //see htmlhint docs / source for what to put here
        var self = this;
        var rule = {
            'regId': /^[a-z-\d]+(__[a-z\-\d]+)*(--[a-z\-\d]+)*$/,
            'message': 'The class attribute values must be in bem style.'
        };
        if (rule && rule.regId){
            var regId = rule.regId,
            message = rule.message;
            parser.addListener('tagstart', function(event){
                var attrs = event.attrs,
                attr,
                col = event.col + event.tagName.length + 1;
                for(var i=0, l1=attrs.length;i<l1;i++){
                    attr = attrs[i];
                    if(attr.name.toLowerCase() === 'class'){
                        var arrClass = attr.value.split(/\s+/g), classValue;
                        for(var j=0, l2=arrClass.length;j<l2;j++){
                            classValue = arrClass[j];
                            if(classValue && regId.test(classValue) === false){
                                reporter.error(message, event.line, col + attr.index, self, classValue);
                            }
                        }
                    }
                }
            });
        }
    }
})
