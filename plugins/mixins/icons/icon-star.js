import Vue from "vue";

const IconStarMixin = {
    install(Vue, options) {
        Vue.mixin({
            data() {
                return {
                    star_dimmed: `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27547 2.38525C7.13303 -0.254065 10.867 -0.254065 11.7245 2.38525C12.108 3.56559 13.208 4.36475 14.4491 4.36475C17.2242 4.36475 18.3781 7.91593 16.1329 9.54712C15.1289 10.2766 14.7087 11.5697 15.0922 12.75C15.9498 15.3893 12.929 17.5841 10.6839 15.9529C9.6798 15.2234 8.3202 15.2234 7.31614 15.9529C5.07101 17.5841 2.05019 15.3893 2.90776 12.75C3.29127 11.5697 2.87113 10.2766 1.86708 9.54712C-0.378063 7.91593 0.775787 4.36475 3.55093 4.36475C4.79201 4.36475 5.89195 3.56559 6.27547 2.38525Z" fill="#BDBDBD"/>
                    </svg>`,
                    star_half: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
                        <svg
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        xmlns:svg="http://www.w3.org/2000/svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        version="1.1"
                        id="svg64">
                        <metadata
                            id="metadata70">
                            <rdf:RDF>
                            <cc:Work
                                rdf:about="">
                                <dc:format>image/svg+xml</dc:format>
                                <dc:type
                                rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                                <dc:title></dc:title>
                            </cc:Work>
                            </rdf:RDF>
                        </metadata>
                        <defs
                            id="defs68" />
                        <mask
                            id="mask0"
                            mask-type="alpha"
                            maskUnits="userSpaceOnUse"
                            x="6"
                            y="6"
                            width="18"
                            height="17">
                            <path
                            d="M12.2755 8.38525C13.133 5.74594 16.867 5.74593 17.7245 8.38525C18.108 9.56559 19.208 10.3647 20.4491 10.3647C23.2242 10.3647 24.3781 13.9159 22.1329 15.5471C21.1289 16.2766 20.7087 17.5697 21.0922 18.75C21.9498 21.3893 18.929 23.5841 16.6839 21.9529C15.6798 21.2234 14.3202 21.2234 13.3161 21.9529C11.071 23.5841 8.05019 21.3893 8.90776 18.75C9.29127 17.5697 8.87113 16.2766 7.86708 15.5471C5.62194 13.9159 6.77579 10.3647 9.55093 10.3647C10.792 10.3647 11.8919 9.56559 12.2755 8.38525Z"
                            fill="#474747"
                            id="path55" />
                        </mask>
                        <g
                            mask="url(#mask0)"
                            id="g62"
                            transform="matrix(1.6127873,0,0,1.7877371,-9.0785253,-10.823752)">
                            <rect
                            x="15"
                            y="-2"
                            width="13"
                            height="34"
                            fill="#ffffff"
                            id="rect58" />
                            <rect
                            x="2"
                            y="-2"
                            width="13"
                            height="34"
                            fill="#ffd65e"
                            id="rect60" />
                        </g>
                        </svg>`,
                    star_light: `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27547 2.38525C7.13303 -0.254065 10.867 -0.254065 11.7245 2.38525C12.108 3.56559 13.208 4.36475 14.4491 4.36475C17.2242 4.36475 18.3781 7.91593 16.1329 9.54712C15.1289 10.2766 14.7087 11.5697 15.0922 12.75C15.9498 15.3893 12.929 17.5841 10.6839 15.9529C9.6798 15.2234 8.3202 15.2234 7.31614 15.9529C5.07101 17.5841 2.05019 15.3893 2.90776 12.75C3.29127 11.5697 2.87113 10.2766 1.86708 9.54712C-0.378063 7.91593 0.775787 4.36475 3.55093 4.36475C4.79201 4.36475 5.89195 3.56559 6.27547 2.38525Z" fill="#FFD65E"/>
                    </svg>`
                };
            }
        });
    }
};

Vue.use(IconStarMixin);
