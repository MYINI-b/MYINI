import Header from 'component/Header';
import './style.scss';

export default function License() {
  return (
    <div className="license-container">
      <Header />
      <div className="license-wrapper">
        <section>
          <div className="license-card">
            <div className="myini-license-title">
              <h2>Copyright and license</h2>
            </div>

            <div className="myini-license-card">
              <h4>MIT LICENSE</h4>
              <h4>Copyright (c) 2022 MYINI</h4>
              <br />
              <h4>
                Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the &quot;Software&quot;), to deal in the Software
                without restriction, including without limitation the rights to
                use, copy, modify, merge, publish, distribute, sublicense,
                and/or sell copies of the Software, and to permit persons to
                whom the Software is furnished to do so, subject to the
                following conditions:
              </h4>
              <br />
              <h4>
                The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.
              </h4>
              <br />
              <h4>
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
                ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
                AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
              </h4>
            </div>
            <div className="library-license">
              <div className="library-license-title">
                <h2>사용한 오픈소스 라이브러리</h2>
              </div>
            </div>
            <div className="library-license-content-container">
              <div className="library-license-content">
                <h3>vuerd</h3>
                <div className="library-license-content-content">
                  <a
                    href="https://github.com/vuerd/vuerd"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://github.com/vuerd/vuerd
                  </a>
                  <h5>Copyright (c) 2020 dineug</h5>
                  <h5>MIT License</h5>
                </div>
              </div>
              <div className="library-license-content">
                <h3>Yjs</h3>
                <div className="library-license-content-content">
                  <a
                    href="https://docs.yjs.dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://docs.yjs.dev/
                  </a>
                  <h5>Copyright (c) 2014</h5>
                  <h5>MIT License</h5>
                </div>
              </div>
              <div className="library-license-content">
                <h3>patch-package</h3>
                <div className="library-license-content-content">
                  <a
                    href="https://github.com/ds300/patch-package"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://github.com/ds300/patch-package
                  </a>
                  <h5>Copyright (c) 2017-Present David Sheldrick</h5>
                  <h5>MIT License</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
