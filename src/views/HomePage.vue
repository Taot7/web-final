<template>
  <<<<<<< HEAD
  <!-- 页首 -->
  <div class="akk">

    <header >

      <div class="logo">
        <img src="https://assets.uooconline.com/upload/uooc-www/org/logo/2018/11/05/181105102853_356892_%E4%BC%98%E8%AF%BE%E8%81%94%E7%9B%9Flogo.png" alt="logo" class="logo-img">
        <h1>课程平台</h1>
      </div>
      <div class="ss">
        <img class="_1ntKd"  src="https://shared-https.ydstatic.com/ke/web/v1.7.3/32aac580.png" alt="" data-reactid="14">
        <input type="text" class="_3l-Kp" placeholder="输入课程或者老师名称" value="" data-reactid="15">

      </div>
      <nav>
        <ul>
          <li><a href="#home">首页</a>

          </li>
          <li><a href="#courses">课程</a></li>
          <li><a href="#about">关于</a></li>
          <li><a href="#contact">联系我们</a></li>
          <li><a href="#login" id="login-link">登录</a></li>
        </ul>
      </nav>

    </header>

    <!-- 课程轮播图 -->
    <!-- 课程轮播图 -->
    <section id="course-carousel">
      <div class="carousel">
        <div
            v-for="(image, index) in carouselCourse"
            :key="index"
            class="carousel-image"
            :class="{
        'active': currentIndex === index,
        'previous': currentIndex === (index - 1 + totalImages) % totalImages,
        'next': currentIndex === (index + 1) % totalImages
      }"
        >
          <img :src="image.coverImage" :alt="image.title" />

          <!-- 课程标题 -->
          <div class="carousel-title">{{ image.title }}</div>

          <!-- 轮播点 -->
          <!-- 轮播图底部点 -->
          <div class="carousel-point-container">
            <div
                v-for="(image, index) in carouselCourse"
                :key="index"
                class="carousel-point"
                :class="{'active': currentIndex === index}"
                @click="goToImage(index)"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 课程类别 -->
    <!-- 课程类别 -->
    <section id="categories">
      <h2>课程类别</h2>
      <ul class="categories-list">
        <li
            v-for="category in courseCategories"
            :key="category.name"
            class="category-item"
        >
          <a
              href="#"
              class="category-link"
              @click.prevent="filterCoursesByCategory(category.name)"
          >
            {{ category.name }}
          </a>
        </li>
      </ul>
    </section>

    <!-- 课程列表和排序控件 -->
    <section id="course-list">
      <div class="filter-controls">
        <label for="sort-field">排序字段：</label>
        <select id="sort-field" v-model="sortField">
          <option value="updateTime">更新时间</option>
          <option value="studentCount">注册人数</option>
          <option value="likeCount">点赞人数</option>
        </select>
        <label for="sort-order">排序顺序：</label>
        <select id="sort-order" v-model="sortOrder">
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
        <button @click="sortCourses">排序</button>
      </div>

      <!-- 横向滑动容器 -->
      <div class="course-container-horizontal">
        <div class="course-item-s" v-for="(course, index) in filteredCourses" :key="index">
          <img :src="course.coverImage" :alt="course.title" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="divider"></div>
          <p>更新时间: {{ course.updateTime }}</p>
          <div class="course-stats">
        <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMjg0YzciIGQ9Ik03IDE0cy0xIDAtMS0xczEtNCA1LTRzNSAzIDUgNHMtMSAxLTEgMXptNC02YTMgMyAwIDEgMCAwLTZhMyAzIDAgMCAwIDAgNm0tNS43ODQgNkEyLjI0IDIuMjQgMCAwIDEgNSAxM2MwLTEuMzU1LjY4LTIuNzUgMS45MzYtMy43MkE2LjMgNi4zIDAgMCAwIDUgOWMtNCAwLTUgMy01IDRzMSAxIDEgMXpNNC41IDhhMi41IDIuNSAwIDEgMCAwLTVhMi41IDIuNSAwIDAgMCAwIDUiLz48L3N2Zz4=" alt="注册人数" class="icon" />
          {{ course.studentCount }}
        </span>
            <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xMi41OTQgMjMuMjU4bC0uMDEyLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM2cS0uMDE2LS4wMDQtLjAyNC4wMDZsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTYtLjAxOG0uMjY0LS4xMTNsLS4wMTQuMDAybC0uMTg0LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA4bC4yMDEuMDkycS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTktLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDAzLS4wMTFsLjAxOC0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiLz48cGF0aCBmaWxsPSIjZTExZDQ4IiBkPSJNOS40OTggNS43OTNjMS40Mi0xLjkwNCAzLjU1NS0yLjQ2IDUuNTE5LTEuOTI1YzIuMTIuNTc3IDMuOTg0IDIuMzk4IDQuNjAzIDQuOTM0cS4wNDguMTk1LjA4My4zOWE0LjQ1IDQuNDUgMCAwIDAtMi43NzQtLjA3Yy0xLjI4Ny0uOTUyLTIuODgxLTEuMTEyLTQuMjk4LS41OWMtMS43NzUuNjU1LTMuMTYxIDIuMzE2LTMuNDgyIDQuNDA2Yy0uNDEgMi42NzYgMS4yMiA1LjA4IDMuNTI1IDcuMTI0bC4zODguMzM2Yy0uMzEzLjAyMi0uNjMxLS4wMjctLjkzNS0uMDkyYTEwIDEwIDAgMCAxLS40NjYtLjExMmwtLjUzNy0uMTVDNi4zNSAxOC43MDEgMy4xNTQgMTYuNiAyLjIzNyAxMy40NmMtLjczMi0yLjUwNi0uMDI4LTUuMDE1IDEuNTItNi41NzVjMS40MzQtMS40NDUgMy41Ni0yLjAzMSA1Ljc0MS0xLjA5Mm0xLjYyOCA3LjQ0OGMuNDI4LTIuNzkyIDMuNjU3LTQuMTY4IDUuMzE1LTEuNzcyYS4xMDQuMTA0IDAgMCAwIC4xNDQuMDI1YzIuMzc3LTEuNjg0IDQuOTQuNzEzIDQuMzg3IDMuNDgzcS0uNDggMi40MS00LjQ3IDRsLS40MzUuMTdsLS4yNjMuMTA4Yy0uMjI3LjA4OS0uNDY3LjE2LS42ODQuMTIyYy0uMjE2LS4wMzgtLjQxNy0uMTg4LS42LS4zNDhsLS4zMS0uMjhxLTMuNDctMi45ODYtMy4wODQtNS41MDgiLz48L2c+PC9zdmc+" alt="点赞人数" class="icon" />
          {{ course.likeCount }}
        </span>
          </div>
          <button @click="viewDetails(course)">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 推荐课程 -->
    <section id="recommend-courses">
      <h2>热门课程</h2>
      <div class="course-container">
        <div
            v-for="(course, index) in recommendedCourses"
            :key="index"
            class="course-item"
        >
          <img :src="course.coverImage" :alt="course.title" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="divider"></div>
          <p>更新时间: {{ course.updateTime }}</p>
          <!-- 添加注册人数和点赞人数 -->
          <div class="course-stats">
        <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMjg0YzciIGQ9Ik03IDE0cy0xIDAtMS0xczEtNCA1LTRzNSAzIDUgNHMtMSAxLTEgMXptNC02YTMgMyAwIDEgMCAwLTZhMyAzIDAgMCAwIDAgNm0tNS43ODQgNkEyLjI0IDIuMjQgMCAwIDEgNSAxM2MwLTEuMzU1LjY4LTIuNzUgMS45MzYtMy43MkE2LjMgNi4zIDAgMCAwIDUgOWMtNCAwLTUgMy01IDRzMSAxIDEgMXpNNC41IDhhMi41IDIuNSAwIDEgMCAwLTVhMi41IDIuNSAwIDAgMCAwIDUiLz48L3N2Zz4=" alt="注册人数" class="icon" />
          {{ course.studentCount }}
        </span>
            <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xMi41OTQgMjMuMjU4bC0uMDEyLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM2cS0uMDE2LS4wMDQtLjAyNC4wMDZsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTYtLjAxOG0uMjY0LS4xMTNsLS4wMTQuMDAybC0uMTg0LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA4bC4yMDEuMDkycS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTktLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDAzLS4wMTFsLjAxOC0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiLz48cGF0aCBmaWxsPSIjZTExZDQ4IiBkPSJNOS40OTggNS43OTNjMS40Mi0xLjkwNCAzLjU1NS0yLjQ2IDUuNTE5LTEuOTI1YzIuMTIuNTc3IDMuOTg0IDIuMzk4IDQuNjAzIDQuOTM0cS4wNDguMTk1LjA4My4zOWE0LjQ1IDQuNDUgMCAwIDAtMi43NzQtLjA3Yy0xLjI4Ny0uOTUyLTIuODgxLTEuMTEyLTQuMjk4LS41OWMtMS43NzUuNjU1LTMuMTYxIDIuMzE2LTMuNDgyIDQuNDA2Yy0uNDEgMi42NzYgMS4yMiA1LjA4IDMuNTI1IDcuMTI0bC4zODguMzM2Yy0uMzEzLjAyMi0uNjMxLS4wMjctLjkzNS0uMDkyYTEwIDEwIDAgMCAxLS40NjYtLjExMmwtLjUzNy0uMTVDNi4zNSAxOC43MDEgMy4xNTQgMTYuNiAyLjIzNyAxMy40NmMtLjczMi0yLjUwNi0uMDI4LTUuMDE1IDEuNTItNi41NzVjMS40MzQtMS40NDUgMy41Ni0yLjAzMSA1Ljc0MS0xLjA5Mm0xLjYyOCA3LjQ0OGMuNDI4LTIuNzkyIDMuNjU3LTQuMTY4IDUuMzE1LTEuNzcyYS4xMDQuMTA0IDAgMCAwIC4xNDQuMDI1YzIuMzc3LTEuNjg0IDQuOTQuNzEzIDQuMzg3IDMuNDgzcS0uNDggMi40MS00LjQ3IDRsLS40MzUuMTdsLS4yNjMuMTA4Yy0uMjI3LjA4OS0uNDY3LjE2LS42ODQuMTIyYy0uMjE2LS4wMzgtLjQxNy0uMTg4LS42LS4zNDhsLS4zMS0uMjhxLTMuNDctMi45ODYtMy4wODQtNS41MDgiLz48L2c+PC9zdmc+" alt="点赞人数" class="icon" />
          {{ course.likeCount }}
        </span>
          </div>
          <button @click="viewDetails(course)">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 热门课程 -->
    <section id="popular-courses">
      <h2>热门课程</h2>
      <div class="course-container">
        <div
            v-for="(course, index) in popularCourses"
            :key="index"
            class="course-item"
        >
          <img :src="course.coverImage" :alt="course.title" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="divider"></div>
          <p>更新时间: {{ course.updateTime }}</p>
          <!-- 添加注册人数和点赞人数 -->
          <div class="course-stats">
        <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMjg0YzciIGQ9Ik03IDE0cy0xIDAtMS0xczEtNCA1LTRzNSAzIDUgNHMtMSAxLTEgMXptNC02YTMgMyAwIDEgMCAwLTZhMyAzIDAgMCAwIDAgNm0tNS43ODQgNkEyLjI0IDIuMjQgMCAwIDEgNSAxM2MwLTEuMzU1LjY4LTIuNzUgMS45MzYtMy43MkE2LjMgNi4zIDAgMCAwIDUgOWMtNCAwLTUgMy01IDRzMSAxIDEgMXpNNC41IDhhMi41IDIuNSAwIDEgMCAwLTVhMi41IDIuNSAwIDAgMCAwIDUiLz48L3N2Zz4=" alt="注册人数" class="icon" />
          {{ course.studentCount }}
        </span>
            <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xMi41OTQgMjMuMjU4bC0uMDEyLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM2cS0uMDE2LS4wMDQtLjAyNC4wMDZsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTYtLjAxOG0uMjY0LS4xMTNsLS4wMTQuMDAybC0uMTg0LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA4bC4yMDEuMDkycS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTktLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDAzLS4wMTFsLjAxOC0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiLz48cGF0aCBmaWxsPSIjZTExZDQ4IiBkPSJNOS40OTggNS43OTNjMS40Mi0xLjkwNCAzLjU1NS0yLjQ2IDUuNTE5LTEuOTI1YzIuMTIuNTc3IDMuOTg0IDIuMzk4IDQuNjAzIDQuOTM0cS4wNDguMTk1LjA4My4zOWE0LjQ1IDQuNDUgMCAwIDAtMi43NzQtLjA3Yy0xLjI4Ny0uOTUyLTIuODgxLTEuMTEyLTQuMjk4LS41OWMtMS43NzUuNjU1LTMuMTYxIDIuMzE2LTMuNDgyIDQuNDA2Yy0uNDEgMi42NzYgMS4yMiA1LjA4IDMuNTI1IDcuMTI0bC4zODguMzM2Yy0uMzEzLjAyMi0uNjMxLS4wMjctLjkzNS0uMDkyYTEwIDEwIDAgMCAxLS40NjYtLjExMmwtLjUzNy0uMTVDNi4zNSAxOC43MDEgMy4xNTQgMTYuNiAyLjIzNyAxMy40NmMtLjczMi0yLjUwNi0uMDI4LTUuMDE1IDEuNTItNi41NzVjMS40MzQtMS40NDUgMy41Ni0yLjAzMSA1Ljc0MS0xLjA5Mm0xLjYyOCA3LjQ0OGMuNDI4LTIuNzkyIDMuNjU3LTQuMTY4IDUuMzE1LTEuNzcyYS4xMDQuMTA0IDAgMCAwIC4xNDQuMDI1YzIuMzc3LTEuNjg0IDQuOTQuNzEzIDQuMzg3IDMuNDgzcS0uNDggMi40MS00LjQ3IDRsLS40MzUuMTdsLS4yNjMuMTA4Yy0uMjI3LjA4OS0uNDY3LjE2LS42ODQuMTIyYy0uMjE2LS4wMzgtLjQxNy0uMTg4LS42LS4zNDhsLS4zMS0uMjhxLTMuNDctMi45ODYtMy4wODQtNS41MDgiLz48L2c+PC9zdmc+" alt="点赞人数" class="icon" />
          {{ course.likeCount }}
        </span>
          </div>
          <button @click="viewDetails(course)">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 最新课程 -->
    <section id="new-courses">
      <h2>热门课程</h2>
      <div class="course-container">
        <div
            v-for="(course, index) in newCourses"
            :key="index"
            class="course-item"
        >
          <img :src="course.coverImage" :alt="course.title" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
          <div class="divider"></div>
          <p>更新时间: {{ course.updateTime }}</p>
          <!-- 添加注册人数和点赞人数 -->
          <div class="course-stats">
        <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMjg0YzciIGQ9Ik03IDE0cy0xIDAtMS0xczEtNCA1LTRzNSAzIDUgNHMtMSAxLTEgMXptNC02YTMgMyAwIDEgMCAwLTZhMyAzIDAgMCAwIDAgNm0tNS43ODQgNkEyLjI0IDIuMjQgMCAwIDEgNSAxM2MwLTEuMzU1LjY4LTIuNzUgMS45MzYtMy43MkE2LjMgNi4zIDAgMCAwIDUgOWMtNCAwLTUgMy01IDRzMSAxIDEgMXpNNC41IDhhMi41IDIuNSAwIDEgMCAwLTVhMi41IDIuNSAwIDAgMCAwIDUiLz48L3N2Zz4=" alt="注册人数" class="icon" />
          {{ course.studentCount }}
        </span>
            <span class="stat-item">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Im0xMi41OTQgMjMuMjU4bC0uMDEyLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM2cS0uMDE2LS4wMDQtLjAyNC4wMDZsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTYtLjAxOG0uMjY0LS4xMTNsLS4wMTQuMDAybC0uMTg0LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA4bC4yMDEuMDkycS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTktLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDAzLS4wMTFsLjAxOC0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiLz48cGF0aCBmaWxsPSIjZTExZDQ4IiBkPSJNOS40OTggNS43OTNjMS40Mi0xLjkwNCAzLjU1NS0yLjQ2IDUuNTE5LTEuOTI1YzIuMTIuNTc3IDMuOTg0IDIuMzk4IDQuNjAzIDQuOTM0cS4wNDguMTk1LjA4My4zOWE0LjQ1IDQuNDUgMCAwIDAtMi43NzQtLjA3Yy0xLjI4Ny0uOTUyLTIuODgxLTEuMTEyLTQuMjk4LS41OWMtMS43NzUuNjU1LTMuMTYxIDIuMzE2LTMuNDgyIDQuNDA2Yy0uNDEgMi42NzYgMS4yMiA1LjA4IDMuNTI1IDcuMTI0bC4zODguMzM2Yy0uMzEzLjAyMi0uNjMxLS4wMjctLjkzNS0uMDkyYTEwIDEwIDAgMCAxLS40NjYtLjExMmwtLjUzNy0uMTVDNi4zNSAxOC43MDEgMy4xNTQgMTYuNiAyLjIzNyAxMy40NmMtLjczMi0yLjUwNi0uMDI4LTUuMDE1IDEuNTItNi41NzVjMS40MzQtMS40NDUgMy41Ni0yLjAzMSA1Ljc0MS0xLjA5Mm0xLjYyOCA3LjQ0OGMuNDI4LTIuNzkyIDMuNjU3LTQuMTY4IDUuMzE1LTEuNzcyYS4xMDQuMTA0IDAgMCAwIC4xNDQuMDI1YzIuMzc3LTEuNjg0IDQuOTQuNzEzIDQuMzg3IDMuNDgzcS0uNDggMi40MS00LjQ3IDRsLS40MzUuMTdsLS4yNjMuMTA4Yy0uMjI3LjA4OS0uNDY3LjE2LS42ODQuMTIyYy0uMjE2LS4wMzgtLjQxNy0uMTg4LS42LS4zNDhsLS4zMS0uMjhxLTMuNDctMi45ODYtMy4wODQtNS41MDgiLz48L2c+PC9zdmc+" alt="点赞人数" class="icon" />
          {{ course.likeCount }}
        </span>
          </div>
          <button @click="viewDetails(course)">查看详情</button>
        </div>
      </div>
    </section>

    <!-- 课程详情模态框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <!-- 关闭按钮 -->
        <span class="close-btn" @click="closeModal">&times;</span>

        <!-- 课程标题 -->
        <h2>{{ modalCourse.title }}</h2>
        <hr class="divider" />

        <!-- 课程简介 -->
        <section>
          <h3>课程简介</h3>
          <p>{{ modalCourse.description }}</p>
        </section>
        <hr class="divider" />

        <!-- 课程文档 -->
        <section v-if="modalCourse.documents && modalCourse.documents.length">
          <h3>课程文档</h3>
          <ul>
            <li v-for="(doc, index) in modalCourse.documents" :key="index">
              <a :href="doc.link" target="_blank">{{ doc.title }}</a>
            </li>
          </ul>
        </section>
        <hr v-if="modalCourse.documents && modalCourse.documents.length" class="divider" />

        <!-- 音视频资源 -->
        <section v-if="modalCourse.media && modalCourse.media.length">
          <h3>音视频资源</h3>
          <ul>
            <li v-for="(media, index) in modalCourse.media" :key="index">
              <a :href="media.link" target="_blank">{{ media.title }}</a>
            </li>
          </ul>
        </section>
        <hr v-if="modalCourse.media && modalCourse.media.length" class="divider" />

        <!-- 讨论区 -->
        <section>
          <h3>讨论区</h3>
          <div class="comments">
            <p v-if="!isLoggedIn">请登录后参与讨论。</p>
            <ul>
              <li v-for="(comment, index) in modalCourse.comments" :key="index">
                <strong>{{ comment.user }}:</strong> {{ comment.content }}
              </li>
            </ul>
            <div v-if="isLoggedIn">
              <textarea v-model="newComment" placeholder="输入您的评论"></textarea>
              <button @click="addComment">发表评论</button>
            </div>
          </div>
        </section>
        <hr class="divider" />

        <!-- 个人笔记 -->
        <section>
          <h3>个人笔记</h3>
          <p v-if="!isLoggedIn">请登录后查看和添加笔记。</p>
          <div v-else>
            <textarea v-model="modalCourse.notes" placeholder="记录您的笔记"></textarea>
            <button @click="saveNotes">保存笔记</button>
          </div>
        </section>
      </div>
    </div>

    <!-- 页脚 -->
    <footer>
      <p>© 2024 在线课程平台 版权所有</p>
    </footer>

  </div>

  =======
  <h1>首页</h1>
  <RouterLink to="/personCenter">
    账户页
  </RouterLink>
  <RouterLink to="/login">
    登录页
  </RouterLink>
  <RouterLink to="/register">
    注册页
  </RouterLink>
  <RouterLink to="/teacher">
    教师页
  </RouterLink>
  <RouterLink to="/user-list">
    用户列表
  </RouterLink>
  >>>>>>> 36b5b65a9ba3bb537bf97021415412220617972d
</template>

<script>
import axios from 'axios';

// 预设课程ID（如果需要）
var recommendedCourses_ID = [0, 1, 2];
var popularCourses_ID = [3, 4, 5];
var newCourses_ID = [6, 7, 8];

export default {
  data() {
    return {
      filteredCourses: [], // 筛选后的课程数据
      selectedCategory: null, // 当前选择的课程类别
      sortField: "updateTime", // 排序字段
      sortOrder: "asc", // 排序顺序
      isLoggedIn: false,
      newComment: "",
      courses: [],
      carouselCourse:[],
      recommendedCourses: [],
      popularCourses: [],
      newCourses: [],
      courseCategories: [
        { name: "编程" },
        { name: "设计" },
        { name: "商业" },
        { name: "文学" },
        { name: "理工" },
        { name: "策划" },
      ],
      showModal: false,
      modalCourse: {},
      totalImages: 3, // 轮播图总数，初始化
      carouselImages: [], // 初始化为空数组
      currentIndex: 0,
      // 本地预设数据
      localCarouselCourses: [
        {
          courseId: 1,
          title: "Vue.js 入门",
          description: "Vue.js 是一个渐进式框架",
          coverImage: "https://oimagea4.ydstatic.com/image?id=4019700121939132344&product=xue",
          likeCount: 120,
          studentCount: 3500,
          viewCount: 15000,
          categoryId: 1,
          updateTime: "2023-09-20T12:00:00Z",
          isRecommended: true,
          categoryName:"编程"
        },
        {
          courseId: 2,
          title: "JavaScript 深入",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 300,
          studentCount: 4500,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-08-15T10:00:00Z",
          isRecommended: false,
          categoryName:"设计"
        },
        {
          courseId: 2,
          title: "JavaScript 深入",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 300,
          studentCount: 4500,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-08-15T10:00:00Z",
          isRecommended: false,
          categoryName:"商业"
        },
        {
          courseId: 2,
          title: "JavaScript 深入",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 300,
          studentCount: 4500,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-08-15T10:00:00Z",
          isRecommended: false,
          categoryName:"文学"
        },
        {
          courseId: 2,
          title: "JavaScript 深入",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 300,
          studentCount: 4500,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-08-15T10:00:00Z",
          isRecommended: false,
          categoryName:"理工"
        },
        {
          courseId: 2,
          title: "JavaScript 深出",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 350,
          studentCount: 4500,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-07-15T10:00:00Z",
          isRecommended: false,
          categoryName:"策划"
        },
        {
          courseId: 2,
          title: "JavaScript 深入",
          description: "JavaScript 高级技巧课程",
          coverImage: "https://oimagea1.ydstatic.com/image?id=8533269818510859732&product=xue",
          likeCount: 300,
          studentCount: 5000,
          viewCount: 20000,
          categoryId: 1,
          updateTime: "2023-08-15T10:00:00Z",
          isRecommended: false,
          categoryName:"策划"
        },
        // 更多课程数据...
      ],
      localRecommendedCourses: [

        {
          courseId: 3,
          title: "React 基础",
          description: "学习 React 的基础知识",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/cover/2019/03/05/190305011321_bb329a_cba106a0-99f6-4134-8498-d75454456cea_900x620_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-09-05T09:00:00Z",
          documents: [
            { title: "React 快速入门", link: "https://example.com/react-guide.pdf" },
            { title: "React 高级技术文档", link: "https://example.com/react-advanced.pdf" },
          ],
          media: [
            { title: "React 入门视频", link: "https://example.com/react-video.mp4" },
            { title: "React 音频教程", link: "https://example.com/react-audio.mp3" },
          ]
        },
        {
          courseId: 3,
          title: "React 基础",
          description: "学习 React 的基础知识",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course293/cover/170804084312_1ce398_ca2cedbd-0779-4bd1-92d7-47807b5c5e93_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-09-05T09:00:00Z",
          documents: [
            { title: "React 快速入门", link: "https://example.com/react-guide.pdf" },
            { title: "React 高级技术文档", link: "https://example.com/react-advanced.pdf" },
          ],
          media: [
            { title: "React 入门视频", link: "https://example.com/react-video.mp4" },
            { title: "React 音频教程", link: "https://example.com/react-audio.mp3" },
          ]
        },
        {
          courseId: 3,
          title: "React 基础",
          description: "学习 React 的基础知识",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/cover/2020/08/31/200831105259_ab6196_354c14d0-ca69-4d07-9033-3dce08664aaa_900x620_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-09-05T09:00:00Z",
          documents: [
            { title: "React 快速入门", link: "https://example.com/react-guide.pdf" },
            { title: "React 高级技术文档", link: "https://example.com/react-advanced.pdf" },
          ],
          media: [
            { title: "React 入门视频", link: "https://example.com/react-video.mp4" },
            { title: "React 音频教程", link: "https://example.com/react-audio.mp3" },
          ]
        },
        {
          courseId: 4,
          title: "Python 数据分析",
          description: "Python 与数据分析的结合",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course293/cover/170804084312_1ce398_ca2cedbd-0779-4bd1-92d7-47807b5c5e93_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-10-01T08:30:00Z",
          documents: [
            { title: "Python 数据分析入门", link: "https://example.com/python-guide.pdf" },
            { title: "Python 高级技术文档", link: "https://example.com/python-advanced.pdf" },
          ],
          media: [
            { title: "Python 数据分析视频", link: "https://example.com/python-video.mp4" },
            { title: "Python 音频教程", link: "https://example.com/python-audio.mp3" },
          ]
        }
      ],
      localPopularCourses: [
        {
          courseId: 4,
          title: "Python 数据分析",
          description: "Python 与数据分析的结合",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course274/cover/170830094122_8da914_114b2fbb-616d-4337-a668-c530fc2f02d9_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-10-01T08:30:00Z",
          documents: [
            { title: "Python 数据分析入门", link: "https://example.com/python-guide.pdf" },
            { title: "Python 高级技术文档", link: "https://example.com/python-advanced.pdf" },
          ],
          media: [
            { title: "Python 数据分析视频", link: "https://example.com/python-video.mp4" },
            { title: "Python 音频教程", link: "https://example.com/python-audio.mp3" },
          ]
        },
        {
          courseId: 4,
          title: "Python 数据分析",
          description: "Python 与数据分析的结合",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course263/cover/170801110207_d72177_06f77d4c-f6f4-4def-b3b1-05e5d9fd2a8c_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-10-01T08:30:00Z",
          documents: [
            { title: "Python 数据分析入门", link: "https://example.com/python-guide.pdf" },
            { title: "Python 高级技术文档", link: "https://example.com/python-advanced.pdf" },
          ],
          media: [
            { title: "Python 数据分析视频", link: "https://example.com/python-video.mp4" },
            { title: "Python 音频教程", link: "https://example.com/python-audio.mp3" },
          ]
        },
        {
          courseId: 5,
          title: "机器学习入门",
          description: "入门级机器学习课程",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course286/cover/170925030930_49353d_4adc8372-7524-485c-a73e-b88197ef4bc7_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-07-20T11:00:00Z",
          documents: [
            { title: "机器学习入门", link: "https://example.com/ml-guide.pdf" },
          ],
          media: [
            { title: "机器学习入门视频", link: "https://example.com/ml-video.mp4" },
          ]
        },
        {
          courseId: 6,
          title: "数据科学",
          description: "数据科学与实践",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course233/cover/170823181131_fc5aa7_a3956db5-b7f7-4693-a94a-0f8bd94c86ec_thumb.png",
          viewCount: 50000,
          likeCount: 1000,
          studentCount: 10000,
          isRecommended: false,
          updateTime: "2023-09-10T15:30:00Z",
          documents: [
            { title: "数据科学入门", link: "https://example.com/datascience-guide.pdf" },
          ],
          media: [
            { title: "数据科学视频", link: "https://example.com/datascience-video.mp4" },
          ]
        }
      ],
      localNewCourses: [
        {
          courseId: 4,
          title: "Python 数据分析",
          description: "Python 与数据分析的结合",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course355/cover/170908074349_97ce47_ded16c7c-f415-4e3d-967e-3ffe9eb61d20_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-10-01T08:30:00Z",
          documents: [
            { title: "Python 数据分析入门", link: "https://example.com/python-guide.pdf" },
            { title: "Python 高级技术文档", link: "https://example.com/python-advanced.pdf" },
          ],
          media: [
            { title: "Python 数据分析视频", link: "https://example.com/python-video.mp4" },
            { title: "Python 音频教程", link: "https://example.com/python-audio.mp3" },
          ]
        },
        {
          courseId: 4,
          title: "Python 数据分析",
          description: "Python 与数据分析的结合",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course328/cover/170907121201_4ed9b3_c7096c1f-2f5c-4321-8f8f-11fbfa9d8380_thumb.png",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          updateTime: "2023-10-01T08:30:00Z",
          documents: [
            { title: "Python 数据分析入门", link: "https://example.com/python-guide.pdf" },
            { title: "Python 高级技术文档", link: "https://example.com/python-advanced.pdf" },
          ],
          media: [
            { title: "Python 数据分析视频", link: "https://example.com/python-video.mp4" },
            { title: "Python 音频教程", link: "https://example.com/python-audio.mp3" },
          ]
        },
        {
          courseId: 7,
          title: "Web 开发全栈教程",
          description: "学习 HTML、CSS、JavaScript 和更多",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/course288/cover/170908075144_7fd619_6e6b9d56-9d87-48bb-aa5c-8873c55ca938_thumb.png",
          updateTime: "2023-11-01T10:00:00Z",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          documents: [
            { title: "Web 开发快速入门", link: "https://example.com/web-dev-guide.pdf" },
          ],
          media: [
            { title: "Web 开发视频", link: "https://example.com/web-dev-video.mp4" },
          ]
        },
        {
          courseId: 8,
          title: "前端优化技巧",
          description: "提高前端性能的技巧",
          coverImage: "https://assets.uooconline.com/upload/uooc-www/course/cover/2021/10/18/211018111337_8e3008_0295fa6b-d398-4a54-9508-cc15fb88a694_900x620_thumb.png",
          updateTime: "2023-10-15T14:00:00Z",
          viewCount: 10000,
          likeCount: 500,
          studentCount: 2000,
          isRecommended: true,
          documents: [
            { title: "前端优化入门", link: "https://example.com/front-end-optimize-guide.pdf" },
          ],
          media: [
            { title: "前端优化视频", link: "https://example.com/front-end-optimize-video.mp4" },
          ]
        }
      ]
    };
  },
  mounted() {
    this.fetchCourses();  // 获取所有课程数据
    this.fetchAllCourses();
    this.fetchRecommendedCourses();  // 获取推荐课程
    this.fetchPopularCourses();  // 获取热门课程
    this.fetchNewCourses();  // 获取最新课程

    // 轮播图自动切换
    setInterval(() => {
      this.nextImage();
    }, 3000);
  },

  methods: {
    goToImage(index) {
      this.currentIndex = index;
    },
    // 按类别筛选课程
    filterCoursesByCategory(category) {
      this.selectedCategory = category;
      this.filteredCourses = this.courses.filter(
          (course) => course.categoryName === category
      );
    },
    // 按指定字段排序课程
    sortCourses() {
      this.filteredCourses.sort((a, b) => {
        let valueA = a[this.sortField];
        let valueB = b[this.sortField];

        // 如果字段是时间，转换为时间对象
        if (this.sortField === "updateTime") {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }

        // 排序逻辑
        if (this.sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    },
    // 获取所有课程数据，并更新轮播图
    async fetchAllCourses() {
      try {
        // 调用课程列表接口
        const response = await axios.get('http://47.115.57.164:81/api/course/list', {
          params: {
            current: 1,     // 当前页
            pageSize: 10,   // 每页10条数据
          }
        });

        if (response.data && response.data.data) {
          this.filteredCourses = this.localCarouselCourses; // 使用本地预设数据
          console.log(response)
        } else {
          throw new Error("未能获取到有效的课程数据");
        }
      } catch (error) {
        console.error("222222无法加载课程数据", error);
        this.filteredCourses = this.localCarouselCourses; // 使用本地预设数据
      } finally {
        this.loading = false; // 数据加载完成，关闭加载状态
      }
    },
    async fetchCourses() {
      try {
        // 调用课程列表接口
        const response = await axios.get('http://47.115.57.164:81/api/course/list', {
          params: {
            current: 1,     // 当前页
            pageSize: 10,   // 每页10条数据
          }
        });

        if (response.data && response.data.data) {

          this.courses = response.data.data; // 赋值课程数据
          // 从课程列表中提取封面图，并更新轮播图
          this.carouselImages = response.data.data
              .slice(0, 3) // 只取前三个课程作为轮播图的封面
              .map(course => course.coverImage); // 提取封面图 URL

          this.totalImages = this.carouselImages.length; // 更新轮播图的总数
        } else {
          console.log(response)
          throw new Error("11111未能获取到有效的课程数据");
        }
      } catch (error) {
        console.error("1111111无法加载课程数据", error);
        this.courses = this.localCarouselCourses; // 使用本地预设数据
        this.carouselCourse=this.courses.slice(0, 3);
        this.carouselImages = this.localCarouselCourses
            .slice(0, 3) // 只取前三个课程作为轮播图的封面
            .map(course => course.coverImage); // 提取封面图 URL
        this.totalImages = this.carouselImages.length; // 更新轮播图的总数
        console.log(this.totalImages)
        console.log(this.carouselImages[0])
      } finally {
        this.loading = false; // 数据加载完成，关闭加载状态
      }
    },

    // 获取推荐课程
    async fetchRecommendedCourses() {
      try {
        const courses = await Promise.all(
            recommendedCourses_ID.map(async (id) => {
              const response = await axios.get('http://47.115.57.164:81/api/course/info/', { params: { id } });
              return response.data.data;
            })
        );
        this.recommendedCourses = courses.flat();  // 合并多个课程信息
        // 筛选推荐课程
        this.recommendedCourses = this.recommendedCourses.filter(course => course.isRecommended);
      } catch (error) {
        console.error("无法加载推荐课程", error);
        this.recommendedCourses = this.localRecommendedCourses.filter(course => course.isRecommended); // 使用本地推荐课程
      }
    },

    // 获取热门课程
    async fetchPopularCourses() {
      try {
        const courses = await Promise.all(
            popularCourses_ID.map(async (id) => {
              const response = await axios.get('http://47.115.57.164:81/api/course/info/', { params: { id } });
              return response.data.data;
            })
        );
        this.popularCourses = courses.flat();  // 合并多个课程信息
        // 按照浏览次数、点赞数、学生数量排序
        this.popularCourses.sort((a, b) => {
          return b.viewCount - a.viewCount || b.likeCount - a.likeCount || b.studentCount - a.studentCount;
        });
      } catch (error) {
        console.error("无法加载热门课程", error);
        this.popularCourses = this.localPopularCourses.sort((a, b) => {
          return b.viewCount - a.viewCount || b.likeCount - a.likeCount || b.studentCount - a.studentCount;
        }); // 使用本地热门课程
      }
    },

    // 获取最新课程
    async fetchNewCourses() {
      try {
        const courses = await Promise.all(
            newCourses_ID.map(async (id) => {
              const response = await axios.get('http://47.115.57.164:81/api/course/info/', { params: { id } });
              return response.data.data;
            })
        );
        this.newCourses = courses.flat();  // 合并多个课程信息
        // 按照更新时间排序
        this.newCourses.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
      } catch (error) {
        console.error("无法加载最新课程", error);
        this.newCourses = this.localNewCourses.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime)); // 使用本地最新课程
      }
    },

    // 轮播图切换
    // 切换到下一张图片
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    },

    // 初始化轮播图内容
    setCarouselImages() {
      this.carouselImages = this.localCarouselCourses.map(course => ({
        title: course.title,
        coverImage: course.coverImage
      }));
      this.totalImages = this.carouselImages.length; // 更新总图片数量
    },

    // 查看课程详情
    viewDetails(course) {
      this.modalCourse = { ...course };
      this.showModal = true;
    },

    // 关闭课程详情弹窗
    closeModal() {
      this.showModal = false;
      this.modalCourse = {};
    },

    // 添加评论
    addComment() {
      if (this.newComment.trim()) {
        this.modalCourse.comments.push({
          user: "当前用户",
          content: this.newComment.trim(),
        });
        this.newComment = "";
      }
    },

    // 保存笔记
    saveNotes() {
      alert("笔记已保存：" + this.modalCourse.notes);
    },

    // 按分类筛选课程
    filterByCategory(category) {
      alert(`筛选课程类别: ${category}`);
    },
  },
};
</script>

<style scoped>
/* 基础样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 20px; /* 圆角卡片样式 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  position: relative;
  animation: slide-down 0.3s ease-out; /* 弹出动画 */
}

@keyframes slide-down {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  color: #ff6b6b; /* 可爱红色关闭按钮 */
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.2); /* 鼠标悬停时放大 */
  color: #ff3b3b; /* 鼠标悬停时颜色加深 */
}

.modal-content h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff;
  text-align: center; /* 标题居中 */
}

.modal-content section {
  margin-bottom: 20px;
}

.modal-content section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgb(51 50 50);
}

.modal-content p,
.modal-content ul {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgb(83 83 83);
}

.modal-content ul {
  padding-left: 20px;
  list-style-type: disc;
}

.modal-content a {
  color: #007bff; /* 链接颜色 */
  text-decoration: none;
  transition: color 0.2s ease;
}

.modal-content a:hover {
  color: #0056b3; /* 鼠标悬停时链接颜色 */
}

.comments ul {
  padding-left: 20px;
  list-style-type: none; /* 移除默认的列表样式 */
}

.comments ul li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9; /* 评论背景色 */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 评论卡片阴影 */
}

textarea {
  width: 100%;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  font-size: 0.95rem;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
}

textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

button {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 0.95rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #ff3b3b;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
  background-color: #e63939;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中对齐所有元素 */
  padding: 10px;
  background-color: white;
  color: dodgerblue;
  border-radius: 5px;
}
header .logo {
  display: flex;
  align-items: center; /* 确保 logo 图片和标题垂直居中 */
}

header .logo img.logo-img {
  height: 40px; /* 设置 logo 图片高度，可根据需要调整 */
  margin-right: 10px; /* 图片与标题之间的间距 */
}
header .logo h1 {
  margin-left: 20px;
  color: dodgerblue;
}

header nav ul {
  list-style: none;
  display: flex;
  align-items: center; /* 确保导航项垂直居中 */
}

header nav ul li {
  margin: 0 20px;
}

header nav ul li a {
  color: dodgerblue; /* 默认字体颜色 */
  text-decoration: none; /* 默认无下划线 */
  display: inline-block; /* 为悬停背景和圆角效果提供支持 */
  padding: 8px 16px; /* 增加内边距使按钮更美观 */
  transition: color 0.3s ease, transform 0.3s ease, background-color 0.3s ease; /* 添加平滑过渡 */
  border-radius: 30px; /* 默认保持圆角 */
  font-weight: 800;
}

header nav ul li a:hover {
  color: #f5f5f5; /* 鼠标悬停时字体颜色变为浅色 */
  text-decoration: none; /* 可选择去掉下划线 */
  background-color: #007bff; /* 鼠标悬停时背景变为蓝色 */
  border-radius: 30px; /* 圆角保持一致 */
  transform: scale(1.1); /* 鼠标悬停时轻微放大 */
  font-weight: 800;
}

header nav ul li a#login-link:hover {
  color: #f5f5f5; /* 鼠标悬停时字体颜色变为浅色 */
  text-decoration: none; /* 可选择去掉下划线 */
  background-color: #007bff; /* 鼠标悬停时背景变为蓝色 */
  border-radius: 30px; /* 圆角保持一致 */
  transform: scale(1.1); /* 鼠标悬停时轻微放大 */

}
/* 课程轮播图样式 */
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 400px;
  background-color: white;
  border-radius: 20px;
}

.carousel-image {
  position: absolute; /* 图片重叠定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: -1; /* 默认放在最底层 */
}

.carousel-image.active {
  opacity: 1;
  z-index: 1; /* 当前激活的图片 */
}

.carousel-image.previous,
.carousel-image.next {
  opacity: 0; /* 不显示的图片 */
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 课程标题样式 */
.carousel-title {
  position: absolute;
  left: 20px;
  bottom: 20px;
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

/* 轮播点样式 */
.carousel-indicator {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  gap: 8px;
}

.carousel-indicator span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s;
}

.carousel-indicator .active-dot {
  background-color: white;
}


/* 课程类别样式 */
.categories-list {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background: #fff;
  text-align: justify;
  font-weight: 800;
  border-radius: 20px;
  border-top: 2px solid #d8f1ff;
}

.category-item {
  list-style: none;
  font-size: 18px;
}

.category-link {
  text-decoration: none; /* 默认无下划线 */
  color: #007bff; /* 默认字体颜色 */
  cursor: pointer; /* 鼠标样式为指针 */
  display: inline-block; /* 为背景色和圆角提供支持 */
  padding: 8px 12px; /* 增加内边距使按钮美观 */
  border-radius: 30px; /* 默认圆角 */
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease; /* 添加平滑过渡 */
}

.category-link:hover {
  text-decoration: none; /* 鼠标悬停时去掉下划线（可选） */
  color: #f5f5f5; /* 字体颜色变为浅色 */
  background-color: #007bff; /* 背景颜色变为蓝色 */
  border-radius: 30px; /* 圆角保持一致 */
  transform: scale(1.1); /* 鼠标悬停时轻微放大 */
}

.course-container {
  background-color: white;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  gap: 20px; /* 控制子元素之间的间距 */
  justify-content: space-between; /* 调整子元素对齐方式 */
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
}
.course-item {
  border-top: 2px solid #d8f1ff;
  width: 20%; /* 每个项目占据约 50% 的宽度 */
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加平滑过渡效果 */
}

.course-item:hover {
  border-top: 2px solid #30b5ff;
  transform: translateY(-10px); /* 鼠标悬停时卡片上移 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时阴影变大 */
}

.course-item img {
  width: 100%;
  border-radius: 10px;
  height: auto;
  margin-bottom: 15px;
  transition: transform 0.3s ease; /* 图片也添加平滑过渡效果 */
}



.course-item h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.course-item p {
  margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.course-item .divider {
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}
.course-item-s button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease; /* 按钮也有平滑过渡效果 */
}
.course-item button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease; /* 按钮也有平滑过渡效果 */
}

.course-item button:hover {
  background-color: #0056b3; /* 鼠标悬停时的按钮颜色变化 */
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  border-top: 3px solid #007bff;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
}

footer {
  text-align: center;
  padding: 10px;
  background-color: #ffffff;
  color: #2a2a2a;
  border-radius: 15px;
  margin-top: 20px;
}
section{
  padding: 10px;
}
.akk{
  background-color: #f5f5f5;
  line-height: 1.375;
  font-family: Arial, sans-serif;
}

h2{
  color: #31404c;
  margin: 15px 0 20px;
  font-size: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: 800;
}

.ss {
  display: flex;
  align-items: center; /* 确保图片和输入框垂直居中 */
  position: relative;
  width: 100%; /* 占据父容器的宽度 */
  max-width: 400px;
  height: 40px;
  margin: 0 auto; /* 居中容器 */
}

._3l-Kp {
  height: 40px;
  width: calc(100% - 50px); /* 留出图片的宽度 */
  color: rgba(255, 255, 255, 0.51);
  background-color: rgba(164, 160, 160, 0.26);
  border-radius: 200px;
  padding-left: 50px; /* 确保文字不会和图片重叠 */
  font-size: 14px;
  box-sizing: border-box;
  border: none;
}

._1ntKd {
  height: 24px; /* 调整图片高度 */
  width: 24px; /* 确保图片是正方形 */
  position: absolute;
  left: 12px; /* 图片距离左边的距离 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%);
  cursor: pointer;
}
.filter-controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.filter-controls label {
  font-weight: bold;
}

.filter-controls select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.filter-controls button {
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-controls button:hover {
  background-color: #0056b3;
}
.course-stats {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #333;
}

.stat-item .icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.course-container-horizontal {
  display: flex;
  overflow-x: auto; /* 允许横向滚动 */
  gap: 20px; /* 项目间距 */
  scroll-snap-type: x mandatory; /* 滚动到最近的子元素 */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
}
.course-item-s {
  width: 20%;
  display: flex;
  flex-direction: column;
  flex: 0 0 300px; /* 固定每个课程卡片的宽度 */
  scroll-snap-align: start; /* 滚动时对齐到容器开头 */
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-top: 2px solid #caeaff;
  transition: transform 0.3s ease;
}

.course-item-s:hover {
  transform: scale(1.05); /* 鼠标悬停时放大效果 */
  border-top: 2px solid #30b5ff;
}

.course-item-s img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.course-container-horizontal::-webkit-scrollbar {
  height: 8px;
}

.course-container-horizontal::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: 4px;
}
.carousel-point-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.carousel-point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-point.active {
  background-color: #007bff;  /* 激活点的颜色 */
}
</style>