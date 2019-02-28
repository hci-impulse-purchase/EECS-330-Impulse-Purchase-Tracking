// Load Charts and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Draw the pie chart for Sarah's pizza when Charts is loaded.
google.charts.setOnLoadCallback(drawSarahChart);

// Draw the pie chart for the Anthony's pizza when Charts is loaded.
google.charts.setOnLoadCallback(drawAnthonyChart);

// Callback that draws the pie chart for Sarah's pizza.
function drawSarahChart() {

    // Create the data table for Sarah's pizza.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Clothing', 15],
        ['Travel', 10],
        ['Eating', 20],
        ['Entertainment', 10],
        ['Self Care', 7],
        ['Education', 5],
        ['Miscellaneous', 2]
    ]);

    // Set options for Sarah's pie chart.
    var options = {title:'My Budget',
        width:465,
        height:280};

    // Instantiate and draw the chart for Sarah's pizza.
    var chart = new google.visualization.PieChart(document.getElementById('budget_whole'));
    chart.draw(data, options);
}

// Callback that draws the pie chart for Anthony's pizza.
function drawAnthonyChart() {

    // Create the data table for Anthony's pizza.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Clothing', 50],
        ['Travel', 10],
        ['Eating', 30],
        ['Entertainment', 30],
        ['Self Care', 20],
        ['Education', 10],
        ['Miscellaneous', 5]
    ]);

    // Set options for Anthony's pie chart.
    var options = {title:'My Binge Expense',
        width:465,
        height:280};

    // Instantiate and draw the chart for Anthony's pizza.
    var chart = new google.visualization.PieChart(document.getElementById('budget_binge'));
    chart.draw(data, options);
}


///////////////////////

// Load google table
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable()
{
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Item');
    data.addColumn('number', 'Frequency');
    data.addColumn('string', 'Recent Purchase Date');
    data.addColumn('number', 'Price');
    data.addColumn('boolean', 'Worth It?');
    data.addRows([
        ['Boots',  1, 'Jan 1, 2019', {v: 1000, f: '$10,00'}, true],
        ['Handbag', 1, 'Jan 20, 2019', {v:300, f: '$3,00'},  false],
        ['Seafood Buffet', 1, 'Feb 2, 2019', {v:200, f:'$2,00'}, false],
        ['Movie', 1, 'Feb 12, 2019', {v:20, f:'$20'}, true],
        ['Computer Game', 1, 'Jan 13, 2019', {v:130, f:'$1,30'}, true],
    ]);

    var table = new google.visualization.Table(document.getElementById('binge_table'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '150%'});
}


function deleteListItem(listItem){
  listItem.parentNode.removeChild(listItem);
}
function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function budgetTableOn() {
    document.getElementById("budget-table").style.display = "block";

}

function updatebudgetTable(){
  if (document.getElementById("budget-table").style.display == "none"){
  budgetTableOn();
}else{
  var itemname = document.getElementById('itemname').value;
  var itemrate = document.getElementById('itemrate').value;
  var qty = document.getElementById('qty').value;
  var itemtotal = document.getElementById('itemtotal').value;

  var tr = document.createElement('tr');
  var td1 = tr.appendChild(document.createElement('td'));
  td1.innerHTML = itemname;
  var td2 = tr.appendChild(document.createElement('td'));
  td2.innerHTML = itemrate;
  var td3 = tr.appendChild(document.createElement('td'));
  td3.innerHTML = qty;
  var td4 = tr.appendChild(document.createElement('td'));
  td4.innerHTML = itemtotal;
  document.getElementById("budgettable").appendChild(tr);

  document.getElementById('itemname').value = '';
  document.getElementById('itemrate').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('itemtotal').value = '';

}


}
