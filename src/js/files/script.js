//Фильтр 

const filters = '.filter';
if (filters) {
    const buttonsSelector = `${filters} .filter__navigation`;
    const checkboxesSelector = `${filters} .filter__spollers`;
    const buttonSelector = `${buttonsSelector} [data-filter]`;
    const checkboxSelector = `${checkboxesSelector} [data-filter]`;
    const buttonActiveClass = '_active';

    const itemsSelector = `${filters} .filter-content`;
    const itemSelector = `${itemsSelector} .filter-column`;
    const itemHiddenClass = '_hide';
    const itemCheckboxHiddenClass = '_hidden-checkbox';
    const itemFilterClassPrefix = 'filter__column_';
    const checkboxFilterClassPrefix = 'filter__checkbox_';

    if (buttonsSelector) {

        document.querySelectorAll(buttonSelector).forEach(n => {
            n.addEventListener('click', onFilterButtonClick);
        });

        function onFilterButtonClick({ currentTarget: { dataset: { filter } } }) {
            const activeItemClass = itemFilterClassPrefix + filter;

            this.closest(buttonsSelector).querySelectorAll(buttonSelector).forEach(n => {
                n.classList.toggle(buttonActiveClass, n === this);
            });

            this.closest(filters).querySelectorAll(itemSelector).forEach(({ classList: cl }) => {
                cl.toggle(itemHiddenClass, filter !== 'all' && !cl.contains(activeItemClass));
            })

        }
    }

    if (checkboxesSelector) {

        document.querySelectorAll(checkboxSelector).forEach(n => {
            n.addEventListener('change', onCheckBoxChange);
        });

        const blocks = Array.
            from(document.querySelectorAll('.filter__column'))
            .map((block) => {
                return {
                    node: block,
                    themes: Array.from(block.classList)
                        .filter(blockClass => blockClass.includes("filter__checkbox_"))
                }
            });

        const inputs = Array.
            from(document.querySelectorAll('.checkbox__input'))
            .map((check) => {
                return {
                    node: check,
                    theme: check.getAttribute("data-filter")
                }
            });

        //Функция которая будет вызываться при любом изменении чекбокса
        function onCheckBoxChange() {
            const checkedInput = inputs.filter((c) => c.node.checked)
            if (checkedInput.length == 0) {
                blocks.forEach((block) => {
                    block.node.classList.remove("_hidden-checkbox")
                })
            } else {
                blocks.forEach((block) => {
                    block.node.classList.remove("_hidden-checkbox") // отобразим все блоки
                })
                let buffBlocks = [...blocks]
                checkedInput.forEach((input) => {
                    buffBlocks = buffBlocks.filter((block) => {
                        return !block.themes.includes(`filter__checkbox_${input.theme}`) //выбор блоков, которые НЕ включает в себя выбраные темы
                    })
                })
                buffBlocks.forEach((block) =>
                    block.node.classList.add("_hidden-checkbox"),
                ) //Наоборот скроем те темы, которые не были выбраны
            }
        }
    }
};

//========================================================================================================================================================

//Скролл 
function scrollBlock() {

    let scrollBlocks = document.querySelectorAll('.scroll');

    if (scrollBlocks) {

        let speed = 2; // Скорость скролла.
        let left = 0;
        let top = 0;
        let drag = false;
        let coorX = 0;
        let coorY = 0;

        scrollBlocks.forEach(scrollBlock => {
            scrollBlock.addEventListener('mousedown', function (e) {
                drag = true;
                coorX = e.pageX;
                coorY = e.pageY;
            });
            document.addEventListener('mouseup', function () {
                drag = false;
                left = scrollBlock.scrollLeft;
                top = scrollBlock.scrollTop;
            });
            scrollBlock.addEventListener('mousemove', function (e) {
                if (drag) {
                    this.scrollLeft = left - (e.pageX - coorX) * speed;
                    this.scrollTop = top - (e.pageY - coorY) * speed;
                }
            });
        });

    }

};

scrollBlock()

//========================================================================================================================================================

//Кнопка вверх

let upButton = document.querySelector('.up-button');

if (upButton) {
    window.onscroll = function () {
        scrollFunction();
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "flex";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }
    upButton.addEventListener("click", function (e) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}