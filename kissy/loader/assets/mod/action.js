KISSY.add('mod/action', function(S) {
        console.log('util module');

        function Action() {
            console.log('Action class');
        }

        S.augment(Action, S.EventTarget);

        return Action;
    }
);