function graphicLastTran(last_months){

    Morris.Bar({
        element: 'morris-last-transactions',
        data: [{
            month: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            month: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            month: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            month: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            month: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            month: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            month: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            month: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            month: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            month: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            month: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            month: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

    $('#loading2').hide();
}

function graphicCreateTran(last_months){

    Morris.Line({
        element: 'morris-create-transactions',
       data: [{
            y: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            y: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            y: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            y: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            y: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            y: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            y: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            y: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            y: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            y: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            y: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            y: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        parseTime: false,
        labels: ['AURORA', 'NETSUITE'],
        lineColors: ["#1531B2", "#B21516"],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    $('#loading2').hide();
}

function graphicLastLine(last_months){

    Morris.Bar({
        element: 'morris-last-lines',
        data: [{
            month: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            month: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            month: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            month: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            month: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            month: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            month: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            month: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            month: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            month: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            month: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            month: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

     $('#loading2').hide();
}

function graphicCreateLine(last_months){

    Morris.Line({
        element: 'morris-create-lines',
        data: [{
            y: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            y: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            y: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            y: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            y: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            y: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            y: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            y: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            y: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            y: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            y: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            y: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        parseTime: false,
        labels: ['AURORA', 'NETSUITE'],
        lineColors: ["#1531B2", "#B21516"],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    $('#loading2').hide();
}


function graphicLastLink(last_months){

    Morris.Bar({
        element: 'morris-last-links',
        data: [{
            month: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            month: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            month: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            month: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            month: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            month: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            month: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            month: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            month: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            month: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            month: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            month: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'month',
        ykeys: ['a', 'b'],
        labels: ['AURORA', 'NETSUITE'],
        barColors: ["#1531B2", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

    $('#loading2').hide();

}

function graphicCreateLink(last_months){

    Morris.Line({
        element: 'morris-create-links',
        data: [{
            y: last_months[11].mess,
            a: last_months[11].aurora,
            b: last_months[11].netsuite
        }, {
            y: last_months[10].mess,
            a: last_months[10].aurora,
            b: last_months[10].netsuite
        }, {
            y: last_months[9].mess,
            a: last_months[9].aurora,
            b: last_months[9].netsuite
        }, { 
            y: last_months[8].mess,
            a: last_months[8].aurora,
            b: last_months[8].netsuite
        }, {
            y: last_months[7].mess,
            a: last_months[7].aurora,
            b: last_months[7].netsuite
        }, {
            y: last_months[6].mess,
            a: last_months[6].aurora,
            b: last_months[6].netsuite
        }, { 
            y: last_months[5].mess,
            a: last_months[5].aurora,
            b: last_months[5].netsuite
        }, {
            y: last_months[4].mess,
            a: last_months[4].aurora,
            b: last_months[4].netsuite
        }, {
            y: last_months[3].mess,
            a: last_months[3].aurora,
            b: last_months[3].netsuite
        }, {
            y: last_months[2].mess,
            a: last_months[2].aurora,
            b: last_months[2].netsuite
        }, {
            y: last_months[1].mess,
            a: last_months[1].aurora,
            b: last_months[1].netsuite
        }, {
            y: last_months[0].mess,
            a: last_months[0].aurora,
            b: last_months[0].netsuite
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        parseTime: false,
        labels: ['AURORA', 'NETSUITE'],
        lineColors: ["#1531B2", "#B21516"],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    $('#loading2').hide();
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
            value: aurora[3].AURORA
        }, {
            label: "NETSUITE",
            value: aurora[3].NETSUITE
        }],
        resize: true
    });


    Morris.Donut({
        element: 'morris-donut-chart2',
        data: [{
            label: "AURORA",
            value: aurora[4].AURORA
        }, {
            label: "NETSUITE",
            value: aurora[4].NETSUITE
        }],
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart3',
        data: [{
            label: "AURORA",
            value: aurora[5].AURORA
        }, {
            label: "NETSUITE",
            value: aurora[5].NETSUITE
        }],
        resize: true
    });
}