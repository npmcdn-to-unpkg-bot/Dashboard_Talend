function graphic_months_tra(last_months_a){

    Morris.Bar({
        element: 'morris-bar-transactions',
        data: [{
            month: last_months_a[11].mess,
            a: last_months_a[11].cantidad,
            b: last_months_a[11].cantidad
        }, {
            month: last_months_a[10].mess,
            a: last_months_a[10].cantidad,
            b: last_months_a[10].cantidad
        }, {
            month: last_months_a[9].mess,
            a: last_months_a[9].cantidad,
            b: last_months_a[9].cantidad
        }, { 
            month: last_months_a[8].mess,
            a: last_months_a[8].cantidad,
            b: last_months_a[8].cantidad
        }, {
            month: last_months_a[7].mess,
            a: last_months_a[7].cantidad,
            b: last_months_a[7].cantidad
        }, {
            month: last_months_a[6].mess,
            a: last_months_a[6].cantidad,
            b: last_months_a[6].cantidad
        }, { 
            month: last_months_a[5].mess,
            a: last_months_a[5].cantidad,
            b: last_months_a[5].cantidad
        }, {
            month: last_months_a[4].mess,
            a: last_months_a[4].cantidad,
            b: last_months_a[4].cantidad
        }, {
            month: last_months_a[3].mess,
            a: last_months_a[3].cantidad,
            b: last_months_a[3].cantidad
        }, {
            month: last_months_a[2].mess,
            a: last_months_a[2].cantidad,
            b: last_months_a[2].cantidad
        }, {
            month: last_months_a[1].mess,
            a: last_months_a[1].cantidad,
            b: last_months_a[1].cantidad
        }, {
            month: last_months_a[0].mess,
            a: last_months_a[0].cantidad,
            b: last_months_a[0].cantidad
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

}

function graphic_months_line(last_months_a){

    Morris.Bar({
        element: 'morris-bar-lines',
        data: [{
            month: last_months_a[11].mess,
            a: last_months_a[11].cantidad,
            b: last_months_a[11].cantidad
        }, {
            month: last_months_a[10].mess,
            a: last_months_a[10].cantidad,
            b: last_months_a[10].cantidad
        }, {
            month: last_months_a[9].mess,
            a: last_months_a[9].cantidad,
            b: last_months_a[9].cantidad
        }, { 
            month: last_months_a[8].mess,
            a: last_months_a[8].cantidad,
            b: last_months_a[8].cantidad
        }, {
            month: last_months_a[7].mess,
            a: last_months_a[7].cantidad,
            b: last_months_a[7].cantidad
        }, {
            month: last_months_a[6].mess,
            a: last_months_a[6].cantidad,
            b: last_months_a[6].cantidad
        }, { 
            month: last_months_a[5].mess,
            a: last_months_a[5].cantidad,
            b: last_months_a[5].cantidad
        }, {
            month: last_months_a[4].mess,
            a: last_months_a[4].cantidad,
            b: last_months_a[4].cantidad
        }, {
            month: last_months_a[3].mess,
            a: last_months_a[3].cantidad,
            b: last_months_a[3].cantidad
        }, {
            month: last_months_a[2].mess,
            a: last_months_a[2].cantidad,
            b: last_months_a[2].cantidad
        }, {
            month: last_months_a[1].mess,
            a: last_months_a[1].cantidad,
            b: last_months_a[1].cantidad
        }, {
            month: last_months_a[0].mess,
            a: last_months_a[0].cantidad,
            b: last_months_a[0].cantidad
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

}


function graphic_months_link(last_months_a){

    Morris.Bar({
        element: 'morris-bar-links',
        data: [{
            month: last_months_a[11].mess,
            a: last_months_a[11].cantidad,
            b: last_months_a[11].cantidad
        }, {
            month: last_months_a[10].mess,
            a: last_months_a[10].cantidad,
            b: last_months_a[10].cantidad
        }, {
            month: last_months_a[9].mess,
            a: last_months_a[9].cantidad,
            b: last_months_a[9].cantidad
        }, { 
            month: last_months_a[8].mess,
            a: last_months_a[8].cantidad,
            b: last_months_a[8].cantidad
        }, {
            month: last_months_a[7].mess,
            a: last_months_a[7].cantidad,
            b: last_months_a[7].cantidad
        }, {
            month: last_months_a[6].mess,
            a: last_months_a[6].cantidad,
            b: last_months_a[6].cantidad
        }, { 
            month: last_months_a[5].mess,
            a: last_months_a[5].cantidad,
            b: last_months_a[5].cantidad
        }, {
            month: last_months_a[4].mess,
            a: last_months_a[4].cantidad,
            b: last_months_a[4].cantidad
        }, {
            month: last_months_a[3].mess,
            a: last_months_a[3].cantidad,
            b: last_months_a[3].cantidad
        }, {
            month: last_months_a[2].mess,
            a: last_months_a[2].cantidad,
            b: last_months_a[2].cantidad
        }, {
            month: last_months_a[1].mess,
            a: last_months_a[1].cantidad,
            b: last_months_a[1].cantidad
        }, {
            month: last_months_a[0].mess,
            a: last_months_a[0].cantidad,
            b: last_months_a[0].cantidad
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

}




function graphic_log(transactions_log){

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            month: 'TRANSACTIONS',
            a: transactions_log.finished_T,
            b: transactions_log.working_T,
            c: transactions_log.warn_T,
            d: transactions_log.error_T
        }, {
            month: 'TRANSACTION LINES',
            a: transactions_log.finished_TLI,
            b: transactions_log.working_TLI,
            c: transactions_log.warn_TLI,
            d: transactions_log.error_TLI
        }, {
            month: 'TRANSACTION LINKS',
            a: transactions_log.finished_TLK,
            b: transactions_log.working_TLK,
            c: transactions_log.warn_TLK,
            d: transactions_log.error_TLK
        }],
        xkey: 'month',
        ykeys: ['a', 'b', 'c', 'd'],
        labels: ['Finished', 'Working', 'Warning', 'Error'],
        barColors: ["#1531B2", "#0b9fbf", "#1AB244", "#B21516"],
        hideHover: 'auto',
        resize: true
    });
}

function graphic_net_aur(aurora){
    
    Morris.Donut({
        element: 'morris-donut-chart1',
        data: [{
            label: "AURORA",
            value: aurora.transactions
        }, {
            label: "NETSUITE",
            value: aurora.transactions
        }],
        resize: true
    });


    Morris.Donut({
        element: 'morris-donut-chart2',
        data: [{
            label: "AURORA",
            value: aurora.tlines
        }, {
            label: "NETSUITE",
            value: aurora.tlines
        }],
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart3',
        data: [{
            label: "AURORA",
            value: aurora.tlinks
        }, {
            label: "NETSUITE",
            value: aurora.tlinks
        }],
        resize: true
    });
}