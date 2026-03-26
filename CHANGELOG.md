## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-26)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove BlogSection block ([5211856](https://github.com/focusreactive/cms-kit/commit/521185618820a857aa756424bede2250f7faef5f))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** show presets collection ([c1e3086](https://github.com/focusreactive/cms-kit/commit/c1e30861cf55acadf9228a94268bc92b2214420c))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **blog:** enhance blog with excerpt, related posts auto-fill, and cleaner layout ([#113](https://github.com/focusreactive/cms-kit/issues/113)) ([0433289](https://github.com/focusreactive/cms-kit/commit/043328992b92f5b5cc771b09f5ae14049e0ed042))
* **payload:** add category filters to blog ([2d7475b](https://github.com/focusreactive/cms-kit/commit/2d7475bce79019472674076e2ace5d9225eedd1a))
* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add customPage link type with config registry ([bcd6c02](https://github.com/focusreactive/cms-kit/commit/bcd6c026015f0284e7e8eb6246f771db8c65f0c8))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update plugin presets configuration according to the latest 0.3.2 version ([851ac9c](https://github.com/focusreactive/cms-kit/commit/851ac9cf063f482a8b6c8848e9e51635a52104e7))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-26)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove BlogSection block ([5211856](https://github.com/focusreactive/cms-kit/commit/521185618820a857aa756424bede2250f7faef5f))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** show presets collection ([c1e3086](https://github.com/focusreactive/cms-kit/commit/c1e30861cf55acadf9228a94268bc92b2214420c))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **blog:** enhance blog with excerpt, related posts auto-fill, and cleaner layout ([#113](https://github.com/focusreactive/cms-kit/issues/113)) ([0433289](https://github.com/focusreactive/cms-kit/commit/043328992b92f5b5cc771b09f5ae14049e0ed042))
* **payload:** add category filters to blog ([2d7475b](https://github.com/focusreactive/cms-kit/commit/2d7475bce79019472674076e2ace5d9225eedd1a))
* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add customPage link type with config registry ([bcd6c02](https://github.com/focusreactive/cms-kit/commit/bcd6c026015f0284e7e8eb6246f771db8c65f0c8))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update plugin presets configuration according to the latest 0.3.2 version ([851ac9c](https://github.com/focusreactive/cms-kit/commit/851ac9cf063f482a8b6c8848e9e51635a52104e7))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-26)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** show presets collection ([c1e3086](https://github.com/focusreactive/cms-kit/commit/c1e30861cf55acadf9228a94268bc92b2214420c))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **blog:** enhance blog with excerpt, related posts auto-fill, and cleaner layout ([#113](https://github.com/focusreactive/cms-kit/issues/113)) ([0433289](https://github.com/focusreactive/cms-kit/commit/043328992b92f5b5cc771b09f5ae14049e0ed042))
* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update plugin presets configuration according to the latest 0.3.2 version ([851ac9c](https://github.com/focusreactive/cms-kit/commit/851ac9cf063f482a8b6c8848e9e51635a52104e7))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-26)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **blog:** enhance blog with excerpt, related posts auto-fill, and cleaner layout ([#113](https://github.com/focusreactive/cms-kit/issues/113)) ([0433289](https://github.com/focusreactive/cms-kit/commit/043328992b92f5b5cc771b09f5ae14049e0ed042))
* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update plugin presets configuration according to the latest 0.3.2 version ([851ac9c](https://github.com/focusreactive/cms-kit/commit/851ac9cf063f482a8b6c8848e9e51635a52104e7))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-25)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **blog:** enhance blog with excerpt, related posts auto-fill, and cleaner layout ([#113](https://github.com/focusreactive/cms-kit/issues/113)) ([0433289](https://github.com/focusreactive/cms-kit/commit/043328992b92f5b5cc771b09f5ae14049e0ed042))
* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-24)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bundle comments plugin CSS instead of external export ([336bf43](https://github.com/focusreactive/cms-kit/commit/336bf43b49ef265192ea9c1656803de3ed415f96))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-24)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** translate loadingComments phrase to spanish ([d163d83](https://github.com/focusreactive/cms-kit/commit/d163d83ba7920f50e99b6dc30d94bd63db458460))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-24)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** remove obsolete comments translations ([80148ff](https://github.com/focusreactive/cms-kit/commit/80148ffe90ac02e5c316c5bf45432fabc745d4a1))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-24)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-23)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** create links based on the locales for the sections ([e88ef34](https://github.com/focusreactive/cms-kit/commit/e88ef34a919033a2801c7ddcdab50a798260ce14))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-23)


### Bug Fixes

* **payload:** add aspect ratio to logos ([587e985](https://github.com/focusreactive/cms-kit/commit/587e98587e3581226b9fd5efa87f5fe45e57a20c))
* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** provide locale to rewrite path for a/b testing ([ef0d389](https://github.com/focusreactive/cms-kit/commit/ef0d389c8555f56900b47ac19b3d898e49283843))
* **payload:** remove deleted locale prop from generatePreviewPath in posts collection ([310bfab](https://github.com/focusreactive/cms-kit/commit/310bfab23b9562fb88cf7d2f24d2446f7cf52b99))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove locale from exit preview in LivePreviewListener ([02a1be2](https://github.com/focusreactive/cms-kit/commit/02a1be235854cc64afa65038e2f13e664c31b479))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))
* **payload:** use getServerSideURL utility to determine server url in ab adapter ([669793c](https://github.com/focusreactive/cms-kit/commit/669793cc473bc650fa2045d79bb502dca7165e60))
* **payload:** use relative url for post images ([fc2fa4c](https://github.com/focusreactive/cms-kit/commit/fc2fa4c09572a2a4ad9b8862c08f592ded11301c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** reorganize path utils and fix preview locale handling ([1d2f723](https://github.com/focusreactive/cms-kit/commit/1d2f72372ff58c59fad513bf8f5ae16e01b9dbae))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** stop using locale cookie ([4322452](https://github.com/focusreactive/cms-kit/commit/432245254adb15bc3139275b7c004cc14508ebee))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-20)


### Bug Fixes

* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** coerce the breadcrumb id to the number type ([0626ad3](https://github.com/focusreactive/cms-kit/commit/0626ad35cfdc004631389421ac6a9475b560d288))
* **payload:** fix the error with the inability to open the preview page at empty path ([5d3519e](https://github.com/focusreactive/cms-kit/commit/5d3519e2db99b53ed734a815bccac0b9bd39c641))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** hide preview secret from client ([e48edec](https://github.com/focusreactive/cms-kit/commit/e48edeceef58dfd9dce0c4c22f8baf4e48674bdb))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))
* **payload:** style and restructure header and footer based on other projects ([74ad856](https://github.com/focusreactive/cms-kit/commit/74ad856306e1aefd4ca43c8b925e31ed47665b43))
* **payload:** style SectionContainer based on other projects ([2b6385c](https://github.com/focusreactive/cms-kit/commit/2b6385ce8c93b9156c5d39574b8d8650006c279c))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** add inline blocks with links, grid cards and logos sections ([59fef5a](https://github.com/focusreactive/cms-kit/commit/59fef5abb21eb7c055832c6ea11e383db0b8c5ba))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** provide post content to show on the card ([77f8b94](https://github.com/focusreactive/cms-kit/commit/77f8b946399094eb1f06d3e1ca0abc3c585fa55d))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-19)


### Bug Fixes

* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** add image group fields ([#110](https://github.com/focusreactive/cms-kit/issues/110)) ([5b6a753](https://github.com/focusreactive/cms-kit/commit/5b6a7535be2567d762223869f7bdef6e868ac206))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.15](https://github.com/focusreactive/cms-kit/compare/v1.0.14...v1.0.15) (2026-03-19)


### Bug Fixes

* **payload:** check draft mode using draftMode utility ([c29b528](https://github.com/focusreactive/cms-kit/commit/c29b528697d853f8d821cc1c7dfeb71f666a6b3c))
* **payload:** get actual page data ([93ae3a4](https://github.com/focusreactive/cms-kit/commit/93ae3a4f519227876c2cf2085dec357efa2bda88))
* **payload:** hide label for section group field ([9a40bec](https://github.com/focusreactive/cms-kit/commit/9a40bece8f239d6200a9bc50f90f08c855ec59de))
* **payload:** open document page according to selected locale ([37dd98c](https://github.com/focusreactive/cms-kit/commit/37dd98c8ca1188e8cdb85f49cb1cf088e08dddcb))
* **payload:** remove docker ([b8504a2](https://github.com/focusreactive/cms-kit/commit/b8504a26a9299d2f774b56c91781d92051d9d154))
* **payload:** remove obsolete A/B testing logic ([ef00c99](https://github.com/focusreactive/cms-kit/commit/ef00c998515c6e65cee4d5f4230956326cd8f848))
* **payload:** rename the folder with shared files to "core" ([0af97d5](https://github.com/focusreactive/cms-kit/commit/0af97d57db4c9201aea3c9ca436a0e7929ad3c5d))
* **payload:** resolve ts error in getAllDocuments by casting payload.find ([b5c87b1](https://github.com/focusreactive/cms-kit/commit/b5c87b1d1dbf34b386782ff37ecd238af4923ee3))
* **payload:** set 1/1 aspect ratio to image as a default ([87a0aad](https://github.com/focusreactive/cms-kit/commit/87a0aad93bf8e60c6bb4f09414391afc2a981627))


### Features

* **payload:** add comments and scheduling plugins ([923de42](https://github.com/focusreactive/cms-kit/commit/923de42fe934e1ed5ac2e260b0a2aec21825c912))
* **payload:** bypass variant preview in preview and live preview modes ([92c7c78](https://github.com/focusreactive/cms-kit/commit/92c7c782da46806bbeedd6849a868bbf9705ec23))
* **payload:** embed section tab in section blocks ([cd9507e](https://github.com/focusreactive/cms-kit/commit/cd9507e89216c639ca09f90b03b54b5612b0c9e3))
* **payload:** hide default locale prefix ([15537fd](https://github.com/focusreactive/cms-kit/commit/15537fd2702ce0ac07070583ff0ee609b610b5a7))
* **payload:** set required to category slug ([22564e0](https://github.com/focusreactive/cms-kit/commit/22564e02a987c7969216d3a09c8f86f174a7aca9))
* **payload:** style sections ([ea887b9](https://github.com/focusreactive/cms-kit/commit/ea887b944a5f8f6559142ee9ff50480a1818c6ee))
* **payload:** update header styles ([84bdb14](https://github.com/focusreactive/cms-kit/commit/84bdb14311d4de6ef0c95dc3e3f594523ab27551))
* **payload:** update project according to the latest A/B testing plugin version ([2631645](https://github.com/focusreactive/cms-kit/commit/2631645546ba690a35dcaa0a0a30e77369132cb9))
* **payload:** update SectionContainer ([f6c32f2](https://github.com/focusreactive/cms-kit/commit/f6c32f2c829fdf7d444645457a4f43de282f9bb2))

## [1.0.14](https://github.com/focusreactive/cms-kit/compare/v1.0.13...v1.0.14) (2025-06-09)


### Bug Fixes

* **readme:** refactor sanity roll out commands ([70706b7](https://github.com/focusreactive/cms-kit/commit/70706b7792aacc30f931d6ec5a2ef42e6a4c9d25))

## [1.0.13](https://github.com/focusreactive/cms-kit/compare/v1.0.12...v1.0.13) (2025-06-09)


### Features

* **sanity:** add import-dataset script to package.json for easier dataset management ([7bab11a](https://github.com/focusreactive/cms-kit/commit/7bab11a870c568dd2af7eef6fdbaed597acde7c5))

## [1.0.12](https://github.com/focusreactive/cms-kit/compare/v1.0.11...v1.0.12) (2025-06-09)


### Features

* **sanity:** add new simplified way to roll out new project using vercel deploy link ([#98](https://github.com/focusreactive/cms-kit/issues/98)) ([4b0efd1](https://github.com/focusreactive/cms-kit/commit/4b0efd16e0fcc7460959ab7d07c24a6cfe190364))

## [1.0.11](https://github.com/focusreactive/cms-kit/compare/v1.0.10...v1.0.11) (2025-06-06)


### Bug Fixes

* **page:** return instructions mock block for missing slug instead of notFound() ([d8025cf](https://github.com/focusreactive/cms-kit/commit/d8025cf76c571746302e371fa23f07ce010d2767))

## [1.0.10](https://github.com/focusreactive/cms-kit/compare/v1.0.9...v1.0.10) (2025-06-03)


### Bug Fixes

* **sanity:** rename NEXT_PUBLIC_SANITY_READ_TOKEN to SANITY_API_READ_TOKEN in environment files ([e66640c](https://github.com/focusreactive/cms-kit/commit/e66640cf631817ee0b305360f3153f1cd50b1cef))


### Features

* **sanity:** consolidate configuration management to work with server side env and remove deprecated config file ([36920c1](https://github.com/focusreactive/cms-kit/commit/36920c1ef6d4de09b884fd85482edcc8f60f8c14))

## [1.0.9](https://github.com/focusreactive/cms-kit/compare/v1.0.8...v1.0.9) (2025-03-07)


### Features

* **section padding property:** add common PaddingX and PaddingY property to every section ([#91](https://github.com/focusreactive/cms-kit/issues/91)) ([ef1f723](https://github.com/focusreactive/cms-kit/commit/ef1f723a4328326954440bb41168e6f6fdb1d84a))

## [1.0.8](https://github.com/focusreactive/cms-kit/compare/v1.0.7...v1.0.8) (2025-02-12)

## [1.0.7](https://github.com/focusreactive/cms-kit/compare/v1.0.6...v1.0.7) (2025-02-12)


### Bug Fixes

* **sanity roll out:** add and use modifyJsonFile function ([b874ce0](https://github.com/focusreactive/cms-kit/commit/b874ce039c8d41d55590cd4ee4c921369e833eaa))

## [1.0.6](https://github.com/focusreactive/cms-kit/compare/v1.0.5...v1.0.6) (2025-02-12)


### Bug Fixes

* **sanity rollout:** fix missing import ([90a0515](https://github.com/focusreactive/cms-kit/commit/90a0515ad5b260bdfc9e3274325ffbf6d6ad6a4b))

## [1.0.5](https://github.com/focusreactive/cms-kit/compare/v1.0.4...v1.0.5) (2025-02-12)


### Bug Fixes

* **sanity rollout:** change actions order ([2cccadc](https://github.com/focusreactive/cms-kit/commit/2cccadc26ad95c52f2a9bdec90a48ab17b5e0d87))

## [1.0.4](https://github.com/focusreactive/cms-kit/compare/v1.0.3...v1.0.4) (2025-02-12)


### Bug Fixes

* **sanity rollout:** rollout script, simplify and unift the logic ([#87](https://github.com/focusreactive/cms-kit/issues/87)) ([980ef90](https://github.com/focusreactive/cms-kit/commit/980ef909993d732d37fa429d72660a12a663839a))

## [1.0.3](https://github.com/focusreactive/cms-kit/compare/v1.0.2...v1.0.3) (2025-02-10)


### Features

* **sanity-template-selector:** move package to monorepo, fix related problems ([#85](https://github.com/focusreactive/cms-kit/issues/85)) ([3e5d5bf](https://github.com/focusreactive/cms-kit/commit/3e5d5bf852367a2691620f3116e806f142867aa6))

## [1.0.2](https://github.com/focusreactive/cms-kit/compare/v1.0.1...v1.0.2) (2025-01-29)


### Bug Fixes

* add @semantic-release/github to create github release for every version ([af35d20](https://github.com/focusreactive/cms-kit/commit/af35d20753963b9ea76eb141de4ec01776786671))

## [1.0.1](https://github.com/focusreactive/cms-kit/compare/v1.0.0...v1.0.1) (2025-01-29)


### Bug Fixes

* release flow to update package.json file and specify commit change format ([3455cf9](https://github.com/focusreactive/cms-kit/commit/3455cf90063dded18be50b7eb8af3c5dbdfaa81a))


### Features

* fix release flow ([6df2080](https://github.com/focusreactive/cms-kit/commit/6df208014e37f54f1e7f174b6afd76d1952ddbf6))
