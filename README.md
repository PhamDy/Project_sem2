# Project_sem2
Group: The Sun
  - Leader: Phạm Đắc Dy
  - Member:
    + Nguyễn Văn Tùng
    + Phạm Hoàng Gia Hưng
    + Nguyễn Duy Hoàng


FPT Aptech T2302M




@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://127.0.0.1:5500");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
