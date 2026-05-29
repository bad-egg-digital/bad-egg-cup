import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Spinner,
  SelectControl,
  Flex,
  FlexItem,
  __experimentalSpacer as Spacer,
} from '@wordpress/components';

export default function SectionArchives({ supports, pagesForArchives, setPagesForArchives, primaryTaxonomies, setPrimaryTaxonomies })
{
  const [ postTypes, setPostTypes ] = useState([]);
  const [ pages, setPages ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState( false );

  useEffect( () => {

    apiFetch( { path: '/badeggcup/v1/pages' } ).then( ( pages ) => {
      if(pages?.topLevel) {
        setPages( pages.topLevel );
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    });

    apiFetch( { path: '/badeggcup/v1/post-types' } ).then( ( response ) => {
      if(response?.hasArchive) {
        setPostTypes( response.hasArchive );
        setIsLoaded(true);

      } else {
        setIsLoaded(false);

      }
    });

    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      let fetchArchives = settings?.badeggcup?.pagesForArchives;
      let fetchTaxonomies = settings?.badeggcup?.primaryTaxonomies;

      if(fetchArchives && fetchTaxonomies) {
        setPagesForArchives( fetchArchives );
        setPrimaryTaxonomies( fetchTaxonomies );
        setIsLoaded(true);

      } else {
        setIsLoaded(false);

      }
    });

  }, [ setPagesForArchives, setPrimaryTaxonomies ] );

  return (
    <PanelBody title={ __('Archive Pages', 'badeggcup') } className="badeggcup-archives">
      { isLoaded &&
        <>
          {
            Object.entries(postTypes).map( ([ postType, props ]) => {
              let label = props?.label;
              let taxonomies = props?.taxonomies;

              let taxList = [ { value: '', label: 'Select a taxonomy' } ];
              Object.entries(taxonomies).map( ([taxonomy, props]) => taxList.push({ value: taxonomy, label: props.label }))

              if(pages) {
                return (
                  <React.Fragment key={ postType } >
                    <Spacer margin="4" />
                    <h4>{ label }</h4>
                    <Flex>
                      <FlexItem style={{ flex: 1 }}>
                        <SelectControl
                          label={ `Page for Archive` }
                          value={ pagesForArchives?.[ postType ] || '' }
                          options={ pages }
                          onChange={ value => {

                            setPagesForArchives( prev => ({
                              ...prev,
                              [postType]: value,
                            }));

                          }}
                          __next40pxDefaultSize
                          __nextHasNoMarginBottom
                        />
                      </FlexItem>

                      { taxonomies && Object.keys(taxonomies).length > 0 &&
                        <FlexItem style={{ flex: 1 }}>
                          <SelectControl
                            label={ `Primary taxonomy` }
                            value={ primaryTaxonomies?.[ postType ] || '' }
                            options={ taxList }
                            onChange={ value => {

                              setPrimaryTaxonomies( prev => ({
                                ...prev,
                                [postType]: value,
                              }));

                            }}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                          />
                        </FlexItem>
                      }
                    </Flex>
                  </React.Fragment>
                )
              }

            })
          }
        </>
      }
    </PanelBody>
  );
}
