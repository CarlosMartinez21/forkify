import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (numPages > 1 && curPage === 1) {
      return `
          <button data-goto= "${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        <p class="btn--inline pagination__btn--center">Page ${curPage}/Page ${numPages}</p>
      `;
    }

    // Last Page
    if (numPages === curPage && numPages > 1) {
      return `
        <button data-goto= "${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <p class="btn--inline  pagination__btn--center">Page ${curPage}/Page ${numPages}</p>
        `;
    }

    // Other Page
    if (numPages > curPage) {
      return `
        <button  data-goto= "${
          curPage - 1
        }"class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
             </svg>
         <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto= "${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <p class="btn--inline pagination__btn--center">Page ${curPage}/Page ${numPages}</p>
        `;
    }
    //Page 1 and there are No other pages

    return ' ';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}
export default new PaginationView();
