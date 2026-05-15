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
  __experimentalSpacer as Spacer,
} from '@wordpress/components';

export default function SectionPagesForArchives({ pagesForArchives, setPagesForArchives })
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
      if(settings?.badeggcup?.pagesForArchives) {
        setPagesForArchives( settings.badeggcup.pagesForArchives );
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    });

  }, [ setPagesForArchives ] );

  return (
    <PanelBody title={ __('Archive Pages', 'badeggcup') } className="badeggcup-archives">
      { isLoaded &&
        <>
          {
            Object.keys(postTypes).map((postType, index) => {
              let label = postTypes[postType];

              if(pages) {
                return (
                  <SelectControl
                    key={ index }
                    label={ `Page for ${ label }` }
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
                )
              }

            })
          }
        </>
      }
    </PanelBody>
  );
}
