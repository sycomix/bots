import React from 'react';
import ReactDOM from 'react-dom';
import EnrichmentsContainer from '../../../containers/EnrichmentsContainer/EnrichmentsContainer';
import EnrichmentsSidebar from '../../../containers/EnrichmentsContainer/EnrichmentsSidebar';

describe('<EnrichmentsContainer />', () => {
  const onEnrichmentFilterClickMock = jest.fn();
  const results = {
    matching_results: 3,
    results: [
      {
        id: '1',
        text: 'a great answer with a great passage',
      },
      {
        id: '2',
        text: 'a great answer 2 with a great passage 2',
      },
      {
        id: '3',
        text: 'a great answer 3 with a great passage 3',
      },
    ]
  };
  const fields = {
    entities: 'enriched_text.entities.text',
    concepts: 'enriched_text.concepts.text',
    categories: 'enriched_text.categories.label',
    sentiments: 'enriched_text.sentiment.document.label',
  }
  const props = {
    enrichedResults: results,
    searchContainerHeight: 0,
    maxRegularResults: 0,
    onEnrichmentFilterClick: onEnrichmentFilterClickMock,
    fields
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EnrichmentsContainer {...props} />, div);
  });
});
