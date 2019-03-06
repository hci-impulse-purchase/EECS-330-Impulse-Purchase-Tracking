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

function budgetTableOff() {
    document.getElementById("budget-table").style.display = "none";
}

function budgetHeadersTableOn() {
    document.getElementById("budget-table-headers").style.display = "block";
}

function budgetTotalOn() {
    document.getElementById("budget-total").style.display = "block";
}

function budgetDetailsTableOn() {
    document.getElementById("budget-table-details").style.display = "block";
}

function updatebudgetTable(){
  if (document.getElementById("budget-table").style.display == "none"){
    budgetHeadersTableOn();
    budgetTableOn();

}else{

  }
}

function saveRow(){
  var itemname = document.getElementById('itemname').value;
  var itemrate = document.getElementById('itemrate').value;
  var qty = document.getElementById('qty').value;
  var itemtotal = document.getElementById('itemtotal').value;

  if(itemname != ''){
    var rowId = Date.now();

    var editIcon = "<i class=\"fa fa-pencil-square-o w3-right-align\" onclick=\"editRow(this," + rowId + ")\"><\/i>";

    var tr = document.createElement('tr');
    var td1 = tr.appendChild(document.createElement('td'));
    td1.innerHTML = itemname;
    var td2 = tr.appendChild(document.createElement('td'));
    td2.innerHTML = itemrate;
    var td3 = tr.appendChild(document.createElement('td'));
    td3.innerHTML = qty;
    var td4 = tr.appendChild(document.createElement('td'));
    td4.innerHTML = itemtotal;
    //td4.contentEditable = "true";
    var td5 = tr.appendChild(document.createElement('td'));
    td5.innerHTML = editIcon;

    tr.id = rowId;
    document.getElementById("budgettabledetails").appendChild(tr);

    updateBudgetTotal(itemtotal);

    if (document.getElementById("budget-table-details").style.display == "none"){
      budgetDetailsTableOn();
    }

    document.getElementById('itemname').value = '';
    document.getElementById('itemrate').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('itemtotal').value = '';
    budgetTableOff();
    if(document.getElementById("budget-total").style.display == "none"){
      budgetTotalOn();
    }
  }else{
    alert("Item name can't be blank!");
  }
}

function updateBudgetTotal(itemtotal){
  var budgettotal = Number(document.getElementById('budget-amount').innerHTML);
  budgettotal = budgettotal + Number(itemtotal);
  document.getElementById('budget-amount').innerHTML = '' + budgettotal;
}

function editRow(r, rowId){
  var row = document.getElementById(rowId);

  document.getElementById('itemname').value = row.cells[0].innerHTML;
  document.getElementById('itemrate').value = row.cells[1].innerHTML;
  document.getElementById('qty').value = row.cells[2].innerHTML;
  document.getElementById('itemtotal').value = row.cells[3].innerHTML;
  budgetTableOn();

  deduction = Number(document.getElementById('itemtotal').value) * -1;
  updateBudgetTotal(deduction);

  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("budgettabledetails").deleteRow(i);
}

function checkPrice() {
  var itemrate = document.getElementById('itemrate').value;
  if(isNaN(itemrate)){
    alert("Price is a number!");
    itemrate = ''+itemrate;
    itemrate = itemrate.slice(0,itemrate.length-1);
    document.getElementById('itemrate').value = ''+itemrate
    return;
  }else{
    if(itemrate < 0){
      alert("Price can't be negative");
      return;
    }
  }
}

function calculateItemTotal(){
  var itemrate = document.getElementById('itemrate').value;
  var qty = document.getElementById('qty').value;

  if(isNaN(qty)){
    alert("Quantity is a number!");
    qty = ''+qty;
    qty = qty.slice(0,qty.length-1);
    document.getElementById('qty').value = ''+qty
    return;
  }else{
    if(qty < 0){
      alert("Quantity can't be negative");
      return;
    }
  }

  total = itemrate * qty;
  document.getElementById('itemtotal').value = '' + total;
}

function updateNewBudgetTitle(){
  var input = document.getElementById('budget_name').value;

  if(input.length > 30){
    alert("The budget name is too long!");
    return;
  }
  if(input.length > 0){
    document.getElementById('new-budget-title').innerHTML = '' + input;
  }else{
    document.getElementById('new-budget-title').innerHTML = 'New Budget';
  }
}

function saveOverlayOn() {
  document.getElementById("overlay").style.display = "block";
  // document.getElementById("okButton").style.display = "block";

  budget_name = document.getElementById('budget_name').value;
  description = document.getElementById('description').value;
  est_date = document.getElementById('est_date').value;
  table_count = document.getElementById("budgettabledetails").rows.length;

  alert_message = '';

  if(budget_name == '' || description == '' || est_date == ''){
    alert_message = "Budget name, Description and Tentative date are mandatory fields!"
    document.getElementById("saveButtons").style.display = "block";
  }else if(table_count == 0){
    alert_message = "There are no items in this budget. Do you want to save an empty budget?";
    document.getElementById("cancelButtons").style.display = "block";
  }else{
    alert_message = "Your budget is successfully saved!";
    document.getElementById("okButton").style.display = "block";
  }

  document.getElementById("overlayMsg").innerHTML = alert_message;
}

function overlayOff(fromButton) {
  document.getElementById("overlay").style.display = "none";
  if(document.getElementById("okButton").style.display == "block"){
    document.getElementById("okButton").style.display = "none";
  }
  if(document.getElementById("cancelButtons").style.display == "block"){
    document.getElementById("cancelButtons").style.display = "none";
  }
  if(document.getElementById("saveButtons").style.display == "block"){
    document.getElementById("saveButtons").style.display = "none";
  }

  if(fromButton == 'save' || fromButton == 'cancel'){
    window.location.href = 'budget_list.html';
  }
}

function updatebudgetList(){
  alert("was here1");
  var budget_list = document.getElementById('budget-list');
  var list_item = document.createElement('li');
  list_item.appendChild(document.createTextNode("Four"));
  var li_id = 'l'+Date.now();
  var inner_html = budget_name + "<div class=\"w3-dropdown-hover w3-right\" style=\"background-color:white;\"><i class=\"fa fa-bars\"><\/i><div class=\"w3-dropdown-content w3-bar-block w3-border\" style=\"right:0\"><a href=\"#\" class=\"w3-bar-item w3-button w3-medium\" onclick=\"overlayOn()\"><i class=\"fa fa-eye\"><\/i> View details<\/a><a href=\"#\" class=\"w3-bar-item w3-button w3-medium\" onclick=\"\"><i class=\"fa fa-credit-card\"><\/i> Track purchase<\/a><a href=\"#\" class=\"w3-bar-item w3-button w3-medium\" onclick=\"deleteListItem(" +li_id+ ")\"><i class=\"fa fa-trash\"><\/i> Delete budget<\/a><\/div><\/div>";
  list_item.id= li_id;
  list_item.innerHTML = inner_html;
  budget_list.appendChild(list_item);
  alert(inner_html);
}

function cancelOverlayOn() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cancelButtons").style.display = "block";
  document.getElementById("overlayMsg").innerHTML = "You have unsaved changes, are you sure you want to cancel?";
}
