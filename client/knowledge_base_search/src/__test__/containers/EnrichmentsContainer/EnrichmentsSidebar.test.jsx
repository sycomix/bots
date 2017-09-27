import React from 'react';
import ReactDOM from 'react-dom';
import EnrichmentsSidebar from '../../../containers/EnrichmentsContainer/EnrichmentsSidebar';

describe('<EnrichmentsSidebar />', () => {
  const onEnrichmentFilterClickMock = jest.fn();
  const aggregations = [
    {
      type: 'term',
      field: 'enriched_text.keywords.text',
      count: 2,
      results: [
        {
          key: 'company',
          matching_results: 357040,
        },
        {
          key: 'shares',
          matching_results: 346871,
        },
      ],
    },
    {
      type: 'term',
      field: 'enriched_text.sentiment.document.label',
      count: 3,
      results: [
        {
          key: 'positive',
          matching_results: 2841187,
        },
        {
          key: 'negative',
          matching_results: 1633542,
        },
        {
          key: 'neutral',
          matching_results: 362964,
        },
      ],
    },
  ];
  const fields = {
    entities: 'enriched_text.entities.text',
    concepts: 'enriched_text.concepts.text',
    categories: 'enriched_text.categories.label',
    sentiments: 'enriched_text.sentiment.document.label',
  };
  const props = {
    aggregations,
    onEnrichmentFilterClick: onEnrichmentFilterClickMock,
    fields
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EnrichmentsSidebar {...props} />, div);
  });
});
