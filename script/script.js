(function () { // Это безымянная функция
    let list = {};
    list['В начале была строка...'] = 'и, судя по тому, как развивались дальше события, строка была /CENSORED/...';
    list['Потом подтянулись комментаторы'] = 'и засрали весь форум своими творениями.';
    list['Но Заратустра сказал:'] = '"Всё это лютый фуфел, суета и мудянка". Хотя, конечно, на самом деле так сказал Веничка Ерофеев, а не Заратустра, но кому какое дело до этого алкоголика.';
    list["А мы просто вгах'нагл фхтагн и..."] = 'нам было глубоко пофиг на все эти нюансы, кек!';
    let root = $('#root');

    Object.keys(list).forEach(elem => {
        let divElem = $('<div>');
        divElem.text(elem);
        divElem.addClass('card');
        let pElem = $('<p>');
        pElem.hide();
        pElem.text(list[elem]);
        divElem.append(pElem);
        root.append(divElem);
    });

    $('.card').click(function () {
        $(this).children('p').stop(true).slideToggle(500);
        $(this).siblings().children('p').slideUp();
    });

})(); // это конец безымянной функции, внутри которой все переменные локальные


for (let i = 0; i < $('.page').length; i++) { // отсюда...
    let newElem = $('<div>');
    newElem.text(i + 1);
    newElem.addClass('btn');
    $('#menuBtns').append(newElem);
};

$('#menuBtns .btn').click(function () {
    let index = $(this).index();
    $('html').animate({
        scrollTop: $('.page').eq(index).offset().top
    })
});  // ...и до сюда код для кнопок удаления

$.ajax({   // этот код формирует изначальные 100 постов с абракадаброй
    url: 'https://jsonplaceholder.typicode.com/posts',
    datatype: 'json',
    success: data => getData(data),
    error: function () { console.log('Первоначальный запрос не отработал без ошибок!'); },
});

function getData(data) {
    data.forEach(elem => {
        let card = $('<div>');
        let title = $('<h2>');
        let body = $('<p>');
        let deleteBtn = $('<div>');
        card.addClass('card');
        card.attr('id', 'cardId' + elem.id);
        title.text(elem.title);
        body.text(elem.body);
        deleteBtn.text('Удалить');
        deleteBtn.addClass('deleteBtn');
        deleteBtn.click(() => deletePost(elem.id));
        card.append(title);
        card.append(body);
        card.append(deleteBtn);
        $('.posts').append(card);
    });
}

function deletePost(id) {
    $.ajax({
        url: `http://jsonplaceholder.typicode.com/posts/${id}`,
        type: 'DELETE',
        success: function () {
            console.log(`Success deleted ${id}!`);
            eraser(id);
        },
        error: function () {
            console.log(`Error deleted ${id}!`);
            modell(id);
        },
    });
}

function eraser(id) {
    $(`#cardId${id}`).remove()
}

function modell(id) { // модальное окно об ошибке, как будто консоли мало
    let modalWindow = $("<div>");
    modalWindow.text(`Ошибка удаления поста номер ${id}!`);
    $(".modell").append(modalWindow);
    modalWindow.click(function () { modalWindow.remove() });
}