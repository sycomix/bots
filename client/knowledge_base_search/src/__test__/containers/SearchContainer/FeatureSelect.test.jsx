import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FeatureSelect from '../../../containers/SearchContainer/FeatureSelect';

describe('<FeatureSelect />', () => {
  let wrapper;
  const onFeatureSelectMock = jest.fn();
  const props = {
    onFeatureSelect: onFeatureSelectMock,
    selectedFeature: FeatureSelect.featureTypes.PASSAGES.value,
    isFetchingResults: false,
  };
  const propsWithRelevancy = Object.assign({}, props, {
    selectedFeature: FeatureSelect.featureTypes.TRAINED.value,
  });
  const propsWithEnrichments = Object.assign({}, props, {
    selectedFeature: FeatureSelect.featureTypes.ENRICHMENTS.value,
  });

  const passagesTabLocation = 0;
  const relevancyTabLocation = 1;
  const enrichmentsTabLocation = 2;
  let passagesTab;
  let relevancyTab;
  let enrichmentsTab;
  let highlightedFeature;

  function renderWithProps(propSet) {
    wrapper = shallow(<FeatureSelect {...propSet} />);
    passagesTab = wrapper.find('.feature_select--list_button').at(passagesTabLocation);
    relevancyTab = wrapper.find('.feature_select--list_button').at(relevancyTabLocation);
    enrichmentsTab = wrapper.find('.feature_select--list_button').at(enrichmentsTabLocation);
    highlightedFeature = wrapper.find('.feature_select--list_button--active');
  }

  function getButtonClickEvent(button) {
    return { target: { value: button.props().value } };
  }

  function clickTab(featureWrapper, tab) {
    tab.simulate('click', getButtonClickEvent(tab));
  }

  describe('basic functionality', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<FeatureSelect {...props} />, div);
    });

    it('has three features', () => {
      renderWithProps(props);

      expect(wrapper.find('.feature_select--list_item')).toHaveLength(3);
    });
  });

  describe('when selecting different features', () => {
    describe('when the selectedFeature is "Passage Search"', () => {
      beforeEach(() => {
        renderWithProps(props);
      });

      it('has "Passage Search" highlighted', () => {
        expect(highlightedFeature.text()).toEqual(FeatureSelect.featureTypes.PASSAGES.text);
      });

      it('disables tab selection for passages only', () => {
        expect(passagesTab.props().disabled).toBe(true);
        expect(relevancyTab.props().disabled).toBe(false);
        expect(enrichmentsTab.props().disabled).toBe(false);
      });
    });

    describe('when the selectedFeature is "Relevancy"', () => {
      beforeEach(() => {
        renderWithProps(propsWithRelevancy);
      });

      it('has "Relevancy" highlighted', () => {
        expect(highlightedFeature.text()).toEqual(FeatureSelect.featureTypes.TRAINED.text);
      });

      it('disables tab selection for relevance only', () => {
        expect(passagesTab.props().disabled).toBe(false);
        expect(relevancyTab.props().disabled).toBe(true);
        expect(enrichmentsTab.props().disabled).toBe(false);
      });
    });

    describe('when the selectedFeature is "Enrichments"', () => {
      beforeEach(() => {
        renderWithProps(propsWithEnrichments);
      });

      it('has "Enrichments" highlighted', () => {
        expect(highlightedFeature.text()).toEqual(FeatureSelect.featureTypes.ENRICHMENTS.text);
      });

      it('disables tab selection for enrichments only', () => {
        expect(passagesTab.props().disabled).toBe(false);
        expect(relevancyTab.props().disabled).toBe(false);
        expect(enrichmentsTab.props().disabled).toBe(true);
      });
    });
  });

  describe('when clicking feature tabs', () => {
    describe('when the passages feature is clicked', () => {
      beforeEach(() => {
        renderWithProps(propsWithRelevancy);
        clickTab(wrapper, passagesTab);
      });

      it('calls onSelect with "passages"', () => {
        expect(onFeatureSelectMock).toBeCalledWith({
          target: {
            value: FeatureSelect.featureTypes.PASSAGES.value,
          },
        });
      });
    });

    describe('when the relevancy feature is clicked', () => {
      beforeEach(() => {
        renderWithProps(props);
        clickTab(wrapper, relevancyTab);
      });

      it('calls onSelect with "relevancy"', () => {
        expect(onFeatureSelectMock).toBeCalledWith({
          target: {
            value: FeatureSelect.featureTypes.TRAINED.value,
          },
        });
      });
    });

    describe('when the enrichments feature is clicked', () => {
      beforeEach(() => {
        renderWithProps(props);
        clickTab(wrapper, enrichmentsTab);
      });

      it('calls onSelect with "enrichments"', () => {
        expect(onFeatureSelectMock).toBeCalledWith({
          target: {
            value: FeatureSelect.featureTypes.ENRICHMENTS.value,
          },
        });
      });
    });
  });

  describe('when the app is fetching results', () => {
    const propsFetchingResults = Object.assign({}, props, {
      isFetchingResults: true,
    });

    beforeEach(() => {
      renderWithProps(propsFetchingResults);
    });

    it('disables tab selection', () => {
      expect(passagesTab.props().disabled).toBe(true);
      expect(relevancyTab.props().disabled).toBe(true);
      expect(enrichmentsTab.props().disabled).toBe(true);
    });
  });
});
