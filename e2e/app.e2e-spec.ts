import { InfiniteUxPrototypePage } from './app.po';

describe('infinite-ux-prototype App', function() {
  let page: InfiniteUxPrototypePage;

  beforeEach(() => {
    page = new InfiniteUxPrototypePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
