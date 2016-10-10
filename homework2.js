function formSetEditReport(idReport, ReportPluginTest, isTesting) {
    //ReportPlugin добавить в параметр тем самым избавиться от внешней зависимости
    if (isTesting){
        var ReportPlugin = ReportPluginTest;
        function toggleReportType(){

        }
    }
    var report = {
        'type': ReportPlugin.defaultReportType,
        'format': ReportPlugin.defaultReportFormat,
        'description': '',
        'period': ReportPlugin.defaultPeriod,
        'hour': ReportPlugin.defaultHour,
        'reports': []
    };

    if (idReport > 0) {
        report = ReportPlugin.reportList[idReport];
        $('#report_submit').val(ReportPlugin.updateReportString);
    }
    else {
        $('#report_submit').val(ReportPlugin.createReportString);
    }

    toggleReportType(report.type);//шов

    $('#report_description').html(report.description);
    $('#report_segment').find('option[value=' + report.idsegment + ']').prop('selected', 'selected');
    $('#report_type').find('option[value=' + report.type + ']').prop('selected', 'selected');
    $('#report_period').find('option[value=' + report.period + ']').prop('selected', 'selected');
    $('#report_hour').val(report.hour);
    $('[name=report_format].' + report.type + ' option[value=' + report.format + ']').prop('selected', 'selected');

    $('[name=reportsList] input').prop('checked', false);

    var key;
    for (key in report.reports) {
        $('.' + report.type + ' [report-unique-id=' + report.reports[key] + ']').prop('checked', 'checked');
    }

    updateReportParametersFunctions[report.type](report.parameters);
    /*
    * Тут я не совсем уверен можно ли убрать эту функцию так как она зависит от report.type,
    * но если бы report.type было ограниченное количество,
    * то можно было бы прописать их все точно так же как toggleReportType()
    * */
    $('#report_idreport').val(idReport);
}