/**
 * 雅安地震 - 物资互助
 *
 * @author: 鬼道(luics)
 * @date: 13-4-22
 */

KISSY.use('xtemplate', function(S, XTemplate) {
    console.log('record init');

    var params = S.unparam(document.location.search.substring(1));
    var pid = params.pid ? params.pid : 0;
    var id = params.id ? params.id : 0;
    var isAdd = id === 0;

    if (!isAdd) {
        S.ajax({
                type: "get",
                dataType: "json",
                url: 'ajax.php',
                data: {
                    func: 'getRecord',
                    id: id
                },
                success: function(record) {
                    for (var k in record) {
                        var dom = S.one('#' + k);
                        //console.log(k, dom);
                        dom && dom.val(record[k]); //+'[type=text]'
                    }
                },
                timeout: 10,
                error: function(textStatus) {
                    console.log(textStatus);
                }
            }
        );
    }

    S.one('#submit').on('click', function() {
        S.ajax({
                type: "get",
                dataType: "json",
                url: 'ajax.php',
                data: {
                    func: isAdd ? 'addRecord' : 'updateRecord',
                    pid: pid,
                    id: id,
                    addr: S.one('#addr').val(),
                    water: S.one('#water').val(),
                    tent: S.one('#tent').val(),
                    lamp: S.one('#lamp').val(),
                    medm: S.one('#medm').val(),
                    drug: S.one('#drug').val(),
                    quilt: S.one('#quilt').val(),
                    cloth: S.one('#cloth').val(),
                    com: S.one('#com').val(),
                    child: S.one('#child').val(),
                    trans: S.one('#trans').val(),
                    other: S.one('#other').val()
                },
                success: function(data) {
                    console.log(data);
                    location.href = 'index.php?pid=' + pid;
                },
                timeout: 10,
                error: function(textStatus) {
                    console.log(textStatus);
                }
            }
        );
    });

    if (isAdd) {
        S.one('#del').hide();
    } else {
        S.one('#del').on('click', function() {
            if (!confirm('确认删除?')) {
                return;
            }
            S.ajax({
                    type: "get",
                    dataType: "json",
                    url: 'ajax.php',
                    data: {
                        func: 'delRecord',
                        id: id
                    },
                    success: function(record) {
                        location.href = 'index.php?pid=' + pid;
                    },
                    timeout: 10,
                    error: function(textStatus) {
                        console.log(textStatus);
                    }
                }
            );
        });
    }

});
