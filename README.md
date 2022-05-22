# BG Admin Panel

* [Next.js + Storybook](https://storybook.js.org/blog/get-started-with-storybook-and-next-js/)
** [Troubleshot](https://stackoverflow.com/a/71031198/368997)
# [Material Dashboard React](https://demos.creative-tim.com/nextjs-material-dashboard/dashboard) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fcreativetimofficial.github.io%2Fnextjs-material-dashboard&text=NextJS%20Material%20Dashboard%20-%20Free%20NextJS%20Admin%20Template&original_referer=https%3A%2F%2Fdemos.creative-tim.com%2Fnextjs-material-dashboard%2F%3F_ga%3D2.10428917.198078103.1532329372-1803433978.1528781151&via=creativetim&hashtags=react%2Cmaterial-ui)


# Create Demo User
```
INSERT INTO public."UsersApp_customuser"
(username,email,contact_number,individual_user,business_user,is_staff,is_active,is_superuser,first_name,last_name,date_joined,last_login,password,is_login,is_paid,is_nid_verified,is_tin_verified,tin_number,nid_number,date_of_birth,gender,address,image,image_url,is_bida_verified,country,user_password)
VALUES (
    'MSF05',
    'msf5@bhalogari.com',
    '+8800000000015',
    TRUE,FALSE,FALSE,TRUE,FALSE,'MSF01','DEMOUSER',NOW(),NOW(),'pbkdf2_sha256$260000$61xA235R6jdxIkoy5eLaFF$tUOLtUJ6vVYfPnwEpP/1yBJBPinjRLu7LPFkT+lEZXE=',FALSE,FALSE,FALSE,FALSE,1,1,NOW(),'M','test 22','Zia_Huda_1652800077_311487_vjRFsGl.webp','https://bhalogari-static.s3.amazonaws.com/media/Zia_Huda_1652800077_311487_vjRFsGl.webp',FALSE,'BD','123456'	)
```

```
INSERT INTO public."UsersApp_customuser"
(username,email,contact_number,individual_user,business_user,is_staff,is_active,is_superuser,first_name,last_name,date_joined,last_login,password,is_login,is_paid,is_nid_verified,is_tin_verified,tin_number,nid_number,date_of_birth,gender,address,image,image_url,is_bida_verified,country,user_password)
VALUES (
    'ADMIN05',
    'admin5@bhalogari.com',
    '+8800000000025',
    TRUE,FALSE,FALSE,TRUE,FALSE,'MSF01','DEMOUSER',NOW(),NOW(),'pbkdf2_sha256$260000$61xA235R6jdxIkoy5eLaFF$tUOLtUJ6vVYfPnwEpP/1yBJBPinjRLu7LPFkT+lEZXE=',FALSE,FALSE,FALSE,FALSE,1,1,NOW(),'M','test 22','Zia_Huda_1652800077_311487_vjRFsGl.webp','https://bhalogari-static.s3.amazonaws.com/media/Zia_Huda_1652800077_311487_vjRFsGl.webp',FALSE,'BD','123456'	)
```